import { NextFunction, Request, Response } from 'express'
import { WalletModel } from '../models/Wallet'
import { CategoryModel } from '../models/Category'

// ADD ZOD SCHEMAS VALIDATOR

export const addUpdateWalletValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.headers
  const { name } = req.body

  // name is required
  if (!name) {
    return res.status(400).send('wallet name is required')
  }

  // check wallets for user limit (no more than 5)
  const walletsCount = await WalletModel.countDocuments({ user: userId })
  if (walletsCount > 5) {
    return res.status(400).send('no more than 5 wallets for user')
  }

  // check if wallet with such name already exists
  const isWalletNameExist = await WalletModel.countDocuments({ user: userId, name }).limit(1)
  if (isWalletNameExist) {
    return res.status(400).send('wallet with such name already exists')
  }

  next()
}

export const updateWalletValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.headers
  const { name, currency, isMain } = req.body
  const { id } = req.params

  // name is required
  if (!name) {
    return res.status(400).send('wallet name is required')
  }

  // check if updated name exists
  if (await WalletModel.findOne({ user: userId, _id: { $ne: id }, name })) {
    return res.status(400).send('wallet with such name already exists')
  }

  // check if at least one wallet is isMain
  if (!isMain && !await WalletModel.findOne({ user: userId, _id: { $ne: id }, isMain: true })) {
    return res.status(400).send('at least one wallet has to be Main')
  }

  next()
}

export const deleteWalletValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.headers
  const { id } = req.params

  // check if wallet is main
  if (await WalletModel.findOne({ user: userId, _id: id, isMain: true })) {
    return res.status(400).send('cant delete main wallet')
  }

  next()
}

export const addCategoryValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.headers
  const { name, type } = req.body

  // check if category name exists
  if (await CategoryModel.findOne({ user: userId, name, type })) {
    return res.status(400).send('category with such name already exist')
  }

  next()
}
