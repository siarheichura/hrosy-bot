import { Telegraf, session } from 'telegraf'
import { IContext } from '../shared/interfaces'

import { CONFIG } from '../shared/config'
import { botHandlers } from './handlers'
import { UserModel } from '../models/User'

export const bot = new Telegraf<IContext>(CONFIG.TG.TOKEN)

export const startBot = async (): Promise<void> => {
  bot.use(session())
  bot.use(async (ctx, next) => {
    const user = await UserModel.findOne({ chatId: ctx.chat!.id })

    ctx.session = ctx.session ?? {}
    ctx.session.userId = user?.id

    await next()
  })

  await bot.telegram.setMyCommands([
    { command: 'start', description: 'start' },
    { command: 'help', description: 'help' }
  ])

  botHandlers(bot)

  if (!CONFIG.IS_PROD) {
    bot.launch()
    console.log('Bot polling for updates..')
  } else {
    bot.telegram.setWebhook(CONFIG.TG.WEBHOOK_URL)
  }
}

