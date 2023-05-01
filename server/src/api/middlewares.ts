import { ErrorRequestHandler, RequestHandler } from 'express'
import { UserModel } from '../models/User'
import { ApiError } from './api-error'

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const { hash, id } = req.headers

  if (!hash || !id) {
    return ApiError.UnauthorizedError()
  }

  const user = await UserModel.findOne({ chatId: id })
  if (!user) {
    return ApiError.UnauthorizedError()
  }

  req.headers.chatId = id
  req.headers.userId = user.id

  next()
}

export const errorMiddleware: ErrorRequestHandler = async (
  err,
  req,
  res,
  next
) => {
  console.log('error middleware log: ', err)

  if (err.status) {
    return res.status(err.status).send({ message: err.message })
  }

  return res
    .status(500)
    .send({ message: `Unexpected server error: ${err.message}` })
}
