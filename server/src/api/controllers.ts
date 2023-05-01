import { RequestHandler } from 'express'
import cc from 'currency-codes'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { service } from './service'
import { OperationType } from '../shared/interfaces'
import { IOperation } from '../models/Operation'
import { ITransfer } from '../models/Transfer'

dayjs.extend(utc)

class Controllers {
  // operations
  getOperations: RequestHandler = async (req, res, next) => {
    try {
      const { userId } = req.headers as { userId: string }
      const { type, start, end } = req.params as {
        type: OperationType
        start: string
        end: string
      }
      const { sort, wallets, categories, comment } = req.query as {
        sort: '1' | '-1'
        wallets?: string
        categories?: string
        comment?: string
      }

      const operations = await service.getOperations(
        userId,
        type,
        { start, end },
        {
          sort: +sort as 1 | -1,
          wallets: wallets?.split(','),
          categories: categories?.split(','),
          comment
        }
      )

      res.send({ data: operations })
    } catch (err) {
      next(err)
    }
  }

  getOperation: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params as { id: string }

      const operation = await service.getOperation(id)

      res.send({ data: operation })
    } catch (err) {
      next(err)
    }
  }

  addOperation: RequestHandler = async (req, res, next) => {
    try {
      const { userId } = req.headers as { userId: string }
      const body = req.body as Partial<IOperation>

      const addedOperation = await service.addOperation({
        ...body,
        user: userId
      })

      res.send({ data: addedOperation, message: 'operation added' })
    } catch (err) {
      next(err)
    }
  }

  updateOperation: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params as { id: string }
      const body = req.body as IOperation

      const operation = await service.updateOperation(id, body)

      res.send({ data: operation, message: 'operation updated' })
    } catch (err) {
      next(err)
    }
  }

  deleteOperation: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params as { id: string }

      const operation = await service.deleteOperation(id)

      res.send({ data: operation, message: 'operation deleted' })
    } catch (err) {
      next(err)
    }
  }

  // wallets
  getWallets: RequestHandler = async (req, res, next) => {
    try {
      const { userId } = req.headers as { userId: string }

      const wallets = await service.getWallets(userId)

      res.send({ data: wallets })
    } catch (err) {
      next(err)
    }
  }

  addWallet: RequestHandler = async (req, res, next) => {
    try {
      const { userId } = req.headers as { userId: string }
      const body = req.body as {
        name: string
        currency: string
        isMain: boolean
      }

      const wallet = await service.addWallet(userId, body)

      res.send({ data: wallet, message: 'wallet added' })
    } catch (err) {
      next(err)
    }
  }

  deleteWallet: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params as { id: string }

      const wallet = await service.deleteWallet(id)

      res.send({ data: wallet, message: 'wallet deleted' })
    } catch (err) {
      next(err)
    }
  }

  updateWallet: RequestHandler = async (req, res, next) => {
    try {
      const { userId } = req.headers as { userId: string }
      const { id } = req.params as { id: string }
      const body = req.body as {
        name: string
        currency: string
        isMain: boolean
      }

      const wallet = await service.updateWallet(userId, id, body)

      res.send({ data: wallet, message: 'wallet updated' })
    } catch (err) {
      next(err)
    }
  }

  // categories
  getCategories: RequestHandler = async (req, res, next) => {
    try {
      const { userId } = req.headers as { userId: string }

      const categories = await service.getCategories(userId)

      res.send({ data: categories })
    } catch (err) {
      next(err)
    }
  }

  addCategory: RequestHandler = async (req, res, next) => {
    try {
      const { userId } = req.headers as { userId: string }
      const body = req.body as { name: string; type: OperationType }

      const category = await service.addCategory({ ...body, user: userId })

      res.send({ data: category, message: 'category added' })
    } catch (err) {
      next(err)
    }
  }

  updateCategory: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params as { id: string }
      const body = req.body as { name: string; type: OperationType }

      const category = await service.updateCategory(id, { ...body })

      res.send({ data: category, message: 'category updated' })
    } catch (err) {
      next(err)
    }
  }

  deleteCategory: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params as { id: string }

      const category = await service.deleteCategory(id)

      res.send({ data: category, message: 'category deleted' })
    } catch (err) {
      next(err)
    }
  }

  // statistics
  getStatistics: RequestHandler = async (req, res, next) => {
    try {
      const { userId } = req.headers as { userId: string }
      const { type, walletId, start, end } = req.params as {
        type: OperationType
        walletId: string
        start: string
        end: string
      }

      const data = await service.getStatistics(userId, walletId, type, {
        start,
        end
      })

      res.send({ data })
    } catch (err) {
      next(err)
    }
  }

  // transfers
  getTransfers: RequestHandler = async (req, res, next) => {
    try {
      const { userId } = req.headers as { userId: string }
      const { start, end } = req.params as { start: string; end: string }

      const transfers = await service.getTransfers(userId, { start, end })

      res.send({ data: transfers })
    } catch (err) {
      next(err)
    }
  }

  addTransfer: RequestHandler = async (req, res, next) => {
    try {
      const { userId } = req.headers as { userId: string }
      const body = req.body as {
        from: string
        to: string
        sumFrom: number
        sumTo: number
        rate: number
        createdAt: string
      }
      const transfer = {
        user: userId,
        ...body
      }

      const addedTransfer = await service.addTransfer(transfer)

      res.send({ data: addedTransfer, message: 'transfer added' })
    } catch (err) {
      next(err)
    }
  }

  updateTransfer: RequestHandler = async (req, res, next) => {
    try {
      const { userId } = req.headers as { userId: string }
      const { id } = req.params as { id: string }
      const body = req.body as Partial<ITransfer>

      const updatedTransfer = await service.updateTransfer(userId, id, body)

      res.send({ data: updatedTransfer, message: 'transfer updated' })
    } catch (err) {
      next(err)
    }
  }

  deleteTransfer: RequestHandler = async (req, res, next) => {
    try {
      const { userId } = req.headers as { userId: string }
      const { id } = req.params as { id: string }

      const deletedTransfer = await service.deleteTransfer(userId, id)

      res.send({ data: deletedTransfer, message: 'transfer deleted' })
    } catch (err) {
      next(err)
    }
  }

  // currencies
  getAllCurrencies: RequestHandler = async (req, res, next) => {
    try {
      const currencies = cc.codes()
      res.send({ data: currencies })
    } catch (err) {
      next(err)
    }
  }
}

export const controller = new Controllers()
