import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { router } from './router'
import { bot } from '../telegram/telegram'
import { CONFIG } from '../shared/config'

const app = express()

app.use(bot.webhookCallback(`/${CONFIG.TG.TOKEN}`))

app.use(cors({ origin: '*' }))
app.use(bodyParser.json())
app.use(router)
app.get('/', (req, res) => res.send({ data: 'some string' }))

export default app
