import { NextFunction, Request, Response } from 'express'
import { UserModel } from '../models/User'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { hash, id } = req.headers

  if (!hash || !id) {
    return res.status(401).send({ error: 'unauthorized' })
  }

  const user = await UserModel.findOne({ chatId: id })
  if (!user) {
    return res.status(404).send({ error: 'no user' })
  }

  req.headers.chatId = id
  req.headers.userId = user.id

  next()
}
