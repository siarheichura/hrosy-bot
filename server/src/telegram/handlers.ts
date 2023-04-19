import { Markup, Telegraf } from 'telegraf'
import { IContext } from '../shared/interfaces'
import { service } from '../api/service'
import { message } from 'telegraf/filters'
import { getCategoriesKeyboard, getOperationDataFromMessage } from './helpers'
import { MESSAGES } from './constants'

export const botHandlers = (bot: Telegraf<IContext>) => {
  bot.command('start', async ctx => {
    const chatId = ctx.chat.id.toString()
    const { username, first_name: firstName, last_name: lastName } = ctx.from

    const existingUser = await service.getUser(chatId)
    if (!existingUser) {
      await service.addUser({ chatId, username, lastName, firstName })
    }

    return ctx.replyWithHTML(MESSAGES.GREETING(username!))
  })

  bot.on(message('text'), async ctx => {
    try {
      const { userId } = ctx.session
      const { type, sum, comment } = getOperationDataFromMessage(ctx.message.text)
      const mainWallet = (await service.getWallets(userId)).find(wallet => wallet.isMain)

      const wallets = await service.getWallets(userId)

      ctx.session.operation = {
        type,
        sum,
        comment,
        wallet: mainWallet!.id,
      }

      const categories = await service.getCategories(userId, type)
      const inlineKeyboard = getCategoriesKeyboard(categories, wallets, mainWallet!.id)

      await ctx.replyWithHTML(MESSAGES.CHOOSE_CATEGORY, inlineKeyboard)
    } catch (err) {
      return ctx.reply(err.message)
    }
  })

  bot.action(/^wallet/, async ctx => {
    const { userId } = ctx.session
    const [_, walletId] = ctx.match.input.split(':')

    if (!ctx.session.operation?.wallet || walletId === ctx.session.operation?.wallet) {
      await ctx.answerCbQuery()
      return
    }

    const wallets = await service.getWallets(userId)

    ctx.session.operation.wallet = walletId

    const categories = await service.getCategories(userId)
    const inlineKeyboard = getCategoriesKeyboard(categories, wallets, walletId)

    await ctx.editMessageText(MESSAGES.CHOOSE_CATEGORY, inlineKeyboard)

    await ctx.answerCbQuery()
  })

  bot.action(/^category/, async ctx => {
    if (!ctx.session.operation?.wallet) {
      return ctx.reply('please try again :(')
    }

    const { userId } = ctx.session
    const { operation } = ctx.session
    const [_, category] = ctx.match.input.split(':')
    const operationToAdd = {
      ...operation,
      category,
      user: userId
    }

    const addedOperation = await service.addOperation(operationToAdd)
    ctx.session.operation = {}

    await ctx.editMessageText(
      await MESSAGES.OPERATION_ADDED(addedOperation) + await MESSAGES.BALANCE(userId),
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [[
            Markup.button.callback('🚫🚫🚫', `delete_operation:${addedOperation.id}`)
          ]]
        }
      }
    )
    await ctx.answerCbQuery()
  })

  bot.action(/^delete_operation/, async ctx => {
    const { userId } = ctx.session
    const [_, operationId] = ctx.match.input.split(':')

    await service.deleteOperation(operationId)

    const wallets = await service.getWallets(userId)
    const walletsString = wallets.reduce((prev, wallet) =>
      prev + `${wallet.name}: ${wallet.balance}${wallet.currency}\n`, '<b>⚖️Мой баланс:</b>\n'
    )

    await ctx.editMessageText(
      '🚫Аперацыя адменена\n\n' + walletsString,
      { parse_mode: 'HTML' }
    )
    await ctx.answerCbQuery()
  })

  bot.action('cancel', async ctx => {
    await ctx.editMessageText('❌Скасавана❌')
    ctx.session.operation = {}
    return ctx.answerCbQuery()
  })
}
