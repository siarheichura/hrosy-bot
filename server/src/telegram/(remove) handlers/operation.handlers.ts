// import { Markup, Telegraf } from 'telegraf'
// import dayjs from 'dayjs'
// import customParseFormat from 'dayjs/plugin/customParseFormat'
// import { IContext, IOperation, IOperationToAdd } from '../../shared/interfaces'
// import { getOperationDataFromMessage } from '../helpers'
// import { service } from '../../api/service'
// import { ACTIONS, DATE_FORMAT, INLINE_KEYBOARD, MESSAGES, STAGES } from '../../shared/constants'
// import { i } from '../../assets'
//
// dayjs.extend(customParseFormat)

// import { message } from 'telegraf/filters'
// import { OPERATION_TYPES } from '../../shared/enums'
// import { getAddedOperationKeyboard, getCategoriesKeyboard, getWalletsKeyboard } from '../keyboards'

// export const initOperationHandlers = (bot: Telegraf<IContext>) => {
  // handle operation message and reply with categories buttons
  // bot.on(message('text'), async ctx => {
  //   if (ctx.session.stage === 'update_date') {
  //     ctx.session.stage = null
  //     const newDate = dayjs(ctx.message.text, DATE_FORMAT, true)
  //     const isDateValid = newDate.isValid()
  //     console.log('date: ', { newDate, isDateValid })
  //
  //     // const updatedOperation = await service.updateOperation()
  //
  //     return ctx.reply('sosatb')
  //   } else {
  //     const { userId } = ctx.session
  //     const { type, sum, comment } = getOperationDataFromMessage(ctx.message.text)
  //     const mainWallet = (await service.getWallets(userId)).find(wallet => wallet.isMain)
  //
  //     ctx.session.operation = { type, sum, comment, wallet: mainWallet.id, currency: mainWallet.currency }
  //
  //     const categories = await service.getCategories(userId)
  //     const keyboard = getCategoriesKeyboard(categories[type])
  //
  //     return ctx.replyWithHTML('🏷️Выберы катэгорыю', keyboard)
  //   }
  // })

  // handle category button click
  // bot.action(/^category /, async ctx => {
  //   const { userId } = ctx.session
  //   const { operation } = ctx.session
  //   const category = ctx.match.input.replace('category ', '').trim()
  //   const operationToAdd = { ...operation, category, user: userId }
  //
  //   const addedOperation = await service.addOperation(operationToAdd)
  //   ctx.session.operation = {}
  //
  //   const wallets = await service.getWallets(userId)
  //   const walletsString = wallets.reduce((prev, wallet) =>
  //     prev + `${wallet.name}: ${wallet.balance}${wallet.currency}\n`, '<b>⚖️Мой баланс:</b>\n'
  //   )
  //
  //   const message = `<b>Дададзены новы ${addedOperation.type === OPERATION_TYPES.INCOME ? 'даход' : 'выдатак'}:</b>\n` +
  //     `<b>📝Катэгорыя:</b> <pre>${addedOperation.category}</pre>\n` +
  //     `<b>💵Сума:</b> <pre>${addedOperation.sum}${addedOperation.currency}</pre>\n` +
  //     `<b>📅Дата:</b> <pre>${dayjs(addedOperation.createdAt).format(DATE_FORMAT)}</pre>\n` +
  //     `<b>💬Каментар:</b> <pre>${addedOperation.comment || ' '}</pre>\n\n` +
  //     walletsString
  //   const keyboard = getAddedOperationKeyboard(addedOperation)
  //
  //   await ctx.editMessageText(message, { parse_mode: 'HTML' })
  //   await ctx.editMessageReplyMarkup({ inline_keyboard: keyboard })
  //   await ctx.answerCbQuery()
  // })

  // handle operation deleting
  // bot.action(/^delete_operation/, async ctx => {
  //   const { userId } = ctx.session
  //   const operationId = ctx.match.input.split(':')[1]
  //
  //   await service.deleteOperation(operationId)
  //
  //   const wallets = await service.getWallets(userId)
  //   const walletsString = wallets.reduce((prev, wallet) =>
  //     prev + `${wallet.name}: ${wallet.balance}${wallet.currency}\n`, '<b>⚖️Мой баланс:</b>\n'
  //   )
  //
  //   await ctx.editMessageText(
  //     '🚫Аперацыя адменена\n\n' + walletsString,
  //     { parse_mode: 'HTML' }
  //   )
  //   await ctx.answerCbQuery()
  // })

  // bot.action(/^update_wallet/, async ctx => {
  //   const { userId } = ctx.session
  //   const operationId = ctx.match.input.split(':')[1]
  //   const walletId = ctx.match.input.split(':')[2]
  //
  //   const wallets = await service.getWallets(userId)
  //   const keyboard = getWalletsKeyboard(wallets, operationId, walletId)
  //
  //   await ctx.editMessageReplyMarkup({ inline_keyboard: [keyboard] })
  //   await ctx.answerCbQuery()
  // })

  // bot.action(/^wallet/, async ctx => {
  //   const { userId } = ctx.session
  //   const [_, walletId, operationId, currency] = ctx.match.input.split(':')
  //
  //   const updatedOperation = (await service.updateOperation(operationId, { wallet: walletId, currency }))!
  //
  //   const wallets = await service.getWallets(userId)
  //   const walletsString = wallets.reduce((prev, wallet) =>
  //     prev + `${wallet.name}: ${wallet.balance}${wallet.currency}\n`, '<b>⚖️Мой баланс:</b>\n'
  //   )
  //
  //   const message = `<b>Дададзены новы ${updatedOperation.type === OPERATION_TYPES.INCOME ? 'даход' : 'выдатак'}:</b>\n` +
  //     `<b>📝Катэгорыя:</b> <pre>${updatedOperation.category}</pre>\n` +
  //     `<b>💵Сума:</b> <pre>${updatedOperation.sum}${updatedOperation.currency}</pre>\n` +
  //     `<b>📅Дата:</b> <pre>${dayjs(updatedOperation.createdAt).format(DATE_FORMAT)}</pre>\n` +
  //     `<b>💬Каментар:</b> <pre>${updatedOperation.comment || ' '}</pre>\n\n` +
  //     walletsString
  //   const keyboard = getAddedOperationKeyboard(updatedOperation)
  //
  //   await ctx.editMessageText(message, { parse_mode: 'HTML' })
  //   await ctx.editMessageReplyMarkup({ inline_keyboard: keyboard })
  //   await ctx.answerCbQuery()
  // })

  // bot.action(/^update_category/, async ctx => {
  //   const { userId } = ctx.session
  //   const [_, operationId] = ctx.match.input.split(':')
  //   ctx.session.operationId = operationId
  //
  //   const categories = await service.getCategories(userId)
  //   const operation = await service.getOperation(operationId)
  //   const keyboard = getCategoriesKeyboard(categories[operation!.type])
  // })

  // bot.action(/^update_date/, async ctx => {
  //   const [_, operationId] = ctx.match.input.split(':')
  //   ctx.session.stage = 'update_date'
  //   ctx.session.operationId = operationId
  //
  //   await ctx.answerCbQuery()
  //   return ctx.reply(`please enter date in ${DATE_FORMAT} format`)
  // })


  // handle lolkek
  // bot.on(message('text'), async (ctx, next) => {
  //   if (ctx.session.stage !== STAGES.SET_CUSTOM_DATE) {
  //     return next()
  //   }
  //
  //   const newDate = dayjs(ctx.message.text, DATE_FORMAT, true)
  //   const isDateValid = newDate.isValid()
  //
  //   if (!isDateValid) {
  //     return ctx.replyWithHTML(`${i.invalid_date}\n` + i.send_date + `<i>(${DATE_FORMAT})</i>`)
  //   }
  //
  //   const operationId = ctx.session.operationId!
  //   await service.updateOperationCreatedAtDate(operationId, newDate)
  //
  //   const previousMessage = ctx.session.message
  //   const messageToAdd = `\n\n<i>${i.clarified_date}: ${newDate.format(DATE_FORMAT)}</i>`
  //
  //   await ctx.reply(
  //     previousMessage + messageToAdd,
  //     {
  //       parse_mode: 'HTML',
  //       reply_markup: {
  //         inline_keyboard: [
  //           INLINE_KEYBOARD.ADD_OPERATION_CANCEL(operationId)
  //         ]
  //       }
  //     }
  //   )
  //
  //   ctx.session.stage = null
  //   ctx.session.message = null
  //   ctx.session.operationId = null
  //
  //   return
  // })

  // send message ([sum] [comment])
  // bot.on('text', async ctx => {
  //   try {
  //     // refactor (move it to service or some helper)
  //     // if it's setting custom date stage
  //     // if (ctx.session.stage === STAGES.SET_CUSTOM_DATE) {
  //     //   const newDate = dayjs(ctx.message.text, DATE_FORMAT, true)
  //     //   const isDateValid = newDate.isValid()
  //     //
  //     //   if (!isDateValid) {
  //     //     return ctx.replyWithHTML(`${i.invalid_date}\n` + i.send_date + `<i>(${DATE_FORMAT})</i>`)
  //     //   }
  //     //
  //     //   const operationId = ctx.session.operationId!
  //     //   await service.updateOperationCreatedAtDate(operationId, newDate)
  //     //
  //     //   const previousMessage = ctx.session.message
  //     //   const messageToAdd = `\n\n<i>${i.clarified_date}: ${newDate.format(DATE_FORMAT)}</i>`
  //     //
  //     //   await ctx.reply(
  //     //     previousMessage + messageToAdd,
  //     //     {
  //     //       parse_mode: 'HTML',
  //     //       reply_markup: {
  //     //         inline_keyboard: [
  //     //           INLINE_KEYBOARD.ADD_OPERATION_CANCEL(operationId)
  //     //         ]
  //     //       }
  //     //     }
  //     //   )
  //     //
  //     //   ctx.session.stage = null
  //     //   ctx.session.message = null
  //     //   ctx.session.operationId = null
  //     //
  //     //   return
  //     // }
  //
  //     // const { id: chatId } = ctx.chat
  //     // const data = getOperationDataFromMessage(ctx.message.text)
  //     //
  //     // const categories = (await service.getCategories(chatId.toString()))[data.type]
  //     // const categoriesKeyboard = INLINE_KEYBOARD.ADD_OPERATION_CATEGORIES(categories)
  //     //
  //     // ctx.session.operation = { ...data }
  //     // return ctx.replyWithHTML(
  //     //   i.choose_category,
  //     //   Markup.inlineKeyboard(categoriesKeyboard, { columns: 2 })
  //     // )
  //   } catch (err) {
  //     console.log('err: ', (err as Error).message)
  //     return ctx.reply((err as Error).message)
  //   }
  // })


  // update operation creation date to yesterday's
  // bot.action(ACTIONS.STARTS_WITH_SET_YESTERDAY_DATE_REGEX, async ctx => {
  //   const operationId = ctx.match.input.split(' ')[1]
  //   const yesterdayDate = dayjs().add(-1, 'day')
  //   await service.updateOperationCreatedAtDate(operationId, yesterdayDate)
  //
  //   const previousMessage = (ctx.callbackQuery.message as { text: string }).text
  //   const messageToAdd = `\n\n<i>${i.clarified_date}: ${yesterdayDate.format(DATE_FORMAT)}</i>`
  //
  //   await ctx.editMessageText(
  //     previousMessage + messageToAdd,
  //     {
  //       parse_mode: 'HTML',
  //       reply_markup: {
  //         inline_keyboard: [
  //           INLINE_KEYBOARD.ADD_OPERATION_CANCEL(operationId)
  //         ]
  //       }
  //     }
  //   )
  //   await ctx.answerCbQuery()
  // })

  // update operation creation date to sent
  // bot.action(ACTIONS.STARTS_WITH_SET_CUSTOM_DATE_REGEX, async ctx => {
  //   ctx.session.operationId = ctx.match.input.split(' ')[1]
  //   ctx.session.stage = STAGES.SET_CUSTOM_DATE
  //   ctx.session.message = (ctx.callbackQuery.message as { text: string }).text
  //
  //   await ctx.editMessageText(
  //     i.send_date + `<i>(${DATE_FORMAT})</i>`,
  //     { parse_mode: 'HTML' }
  //   )
  //   await ctx.answerCbQuery()
  // })
// }
