import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { router } from './router'
import { bot } from '../telegram/telegram'
import { CONFIG } from '../shared/config'
import { errorMiddleware } from './middlewares'

const app = express()

app.use(bot.webhookCallback(`/${CONFIG.TG.TOKEN}`))

app.use(cors({ origin: '*' }))
app.use(bodyParser.json())
app.use(router)
app.use(errorMiddleware)

export default app
