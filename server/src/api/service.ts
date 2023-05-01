import { ObjectId } from 'mongodb'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { UserModel, IUser } from '../models/User'
import { OperationModel, IOperation } from '../models/Operation'
import { WalletModel, IWallet } from '../models/Wallet'
import {
  ICategories,
  IDayOperations,
  OperationType
} from '../shared/interfaces'
import {
  BASIC_EXPENSE_CATEGORIES,
  BASIC_INCOME_CATEGORIES,
  BASIC_WALLETS
} from '../telegram/constants'
import { OPERATION_TYPES } from '../shared/enums'
import { ITransfer, TransferModel } from '../models/Transfer'
import { TransferDto } from './dtos/transfer.dto'
import { OperationDto } from './dtos/operation.dto'
import { CategoryModel, ICategory } from '../models/Category'
import { CategoryDto } from './dtos/category.dto'
import { WalletDto } from './dtos/wallet.dto'
import { ApiError } from './api-error'

dayjs.extend(utc)

class Service {
  // user
  addUser = async (user: Partial<IUser>): Promise<IUser> => {
    // add user to db
    const addedUser = await UserModel.create({
      chatId: user.chatId,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName
    })

    // add initial user wallets to db
    await Promise.all(
      BASIC_WALLETS.map(wallet =>
        WalletModel.create({
          user: addedUser._id,
          name: wallet.name,
          isMain: wallet.isMain
        })
      )
    )

    // add initial user categories to db
    await Promise.all(
      BASIC_EXPENSE_CATEGORIES.map(c =>
        CategoryModel.create({
          user: addedUser._id,
          name: c,
          type: OPERATION_TYPES.EXPENSE
        })
      )
    )
    await Promise.all(
      BASIC_INCOME_CATEGORIES.map(c =>
        CategoryModel.create({
          user: addedUser._id,
          name: c,
          type: OPERATION_TYPES.INCOME
        })
      )
    )

    return addedUser
  }

  getUser = async (chatId: string) => {
    return UserModel.findOne({ chatId })
  }

  // operations
  getOperations = async (
    userId: string,
    type: OperationType,
    period: { start: string; end: string },
    filters: {
      sort: 1 | -1
      wallets?: string[]
      categories?: string[]
      comment?: string
    }
  ): Promise<IDayOperations[]> => {
    const start = dayjs(period.start).utc(true).startOf('day').toDate()
    const end = dayjs(period.end).utc(true).endOf('day').toDate()
    const { sort, wallets, categories, comment } = filters

    return OperationModel.aggregate([
      {
        $match: {
          user: new ObjectId(userId),
          type,
          createdAt: { $gte: start, $lte: end },
          wallet: wallets
            ? { $in: wallets.map(id => new ObjectId(id)) }
            : { $exists: true },
          category: categories ? { $in: categories } : { $exists: true },
          comment: comment
            ? { $regex: comment, $options: 'i' }
            : { $exists: true }
        }
      },
      {
        $lookup: {
          from: 'wallets',
          localField: 'wallet',
          foreignField: '_id',
          as: 'wallet',
          pipeline: [{ $project: { _id: 0, id: '$_id', name: 1, currency: 1 } }]
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
          pipeline: [{ $project: { _id: 0, id: '$_id', name: 1 } }]
        }
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          type: 1,
          sum: 1,
          category: { $first: '$category' },
          wallet: { $first: '$wallet' },
          comment: 1,
          createdAt: 1
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          operations: { $push: '$$ROOT' }
        }
      },
      { $project: { _id: 0, date: '$_id', operations: 1 } },
      { $sort: { date: sort } }
    ])
  }

  getOperation = async (id: string) => {
    const operation = await OperationModel.findById(id)

    if (!operation) {
      throw ApiError.BadRequest('Operation is not found')
    }

    return new OperationDto(operation)
  }

  addOperation = async (operation: Partial<IOperation>) => {
    const addedOperation = await OperationModel.create({
      ...operation,
      createdAt: dayjs(operation.createdAt).utc(true)
    })

    await this.updateWalletBalance(addedOperation.wallet.toString())

    return new OperationDto(addedOperation)
  }

  updateOperation = async (
    operationId: string,
    operation: Partial<IOperation>
  ) => {
    const updatedOperation = await OperationModel.findByIdAndUpdate(
      operationId,
      { ...operation, createdAt: dayjs(operation.createdAt).utc(true) },
      { new: true }
    )

    if (!updatedOperation) {
      throw ApiError.BadRequest('Operation is not found')
    }

    await this.updateAllUserWalletsBalance(updatedOperation.user.toString())

    return new OperationDto(updatedOperation)
  }

  deleteOperation = async (id: string) => {
    const deletedOperation = await OperationModel.findByIdAndDelete(id)

    if (!deletedOperation) {
      throw ApiError.BadRequest('Operation is not found')
    }

    await this.updateWalletBalance(deletedOperation.wallet.toString())

    return new OperationDto(deletedOperation)
  }

  // wallets
  getWallets = async (userId: string) => {
    return WalletModel.find({ user: userId, deletedAt: null })
      .sort({ isMain: -1 })
      .transform(wallets => wallets.map(wallet => new WalletDto(wallet)))
  }

  addWallet = async (userId: string, wallet: Partial<IWallet>) => {
    const createdWallet = await WalletModel.create({
      ...wallet,
      user: userId
    })

    if (wallet.isMain) {
      await WalletModel.updateMany(
        { user: userId, _id: { $ne: createdWallet._id } },
        { isMain: false }
      )
    }

    return new WalletDto(createdWallet)
  }

  deleteWallet = async (id: string) => {
    const deletedWallet = await WalletModel.findByIdAndUpdate(id, {
      deletedAt: Date.now()
    })

    if (!deletedWallet) {
      throw ApiError.BadRequest('Wallet is not found')
    }

    return new WalletDto(deletedWallet)
  }

  updateWallet = async (userId: string, id: string, data: Partial<IWallet>) => {
    const updatedWallet = await WalletModel.findByIdAndUpdate(
      id,
      { ...data },
      { new: true }
    )

    if (!updatedWallet) {
      throw ApiError.BadRequest('Wallet is not found')
    }

    if (data.isMain) {
      await WalletModel.updateMany(
        { user: userId, _id: { $ne: updatedWallet._id } },
        { isMain: false }
      )
    }

    await OperationModel.updateMany({ wallet: id }, { currency: data.currency })

    return new WalletDto(updatedWallet)
  }

  updateWalletBalance = async (walletId: string) => {
    const operationsTotal = await OperationModel.aggregate([
      { $match: { wallet: new ObjectId(walletId) } },
      { $group: { _id: '$type', sum: { $sum: '$sum' } } },
      { $project: { _id: 0, type: '$_id', sum: 1 } }
    ])
    const incomesSum =
      operationsTotal.find(i => i.type === OPERATION_TYPES.INCOME)?.sum || 0
    const expensesSum =
      operationsTotal.find(i => i.type === OPERATION_TYPES.EXPENSE)?.sum || 0

    const transfersFromTotal = await TransferModel.aggregate([
      { $match: { from: new ObjectId(walletId) } },
      { $group: { _id: '$from', sum: { $sum: '$sumFrom' } } }
    ])
    const transferFromSum = transfersFromTotal[0]?.sum || 0

    const transfersToTotal = await TransferModel.aggregate([
      { $match: { to: new ObjectId(walletId) } },
      { $group: { _id: '$to', sum: { $sum: '$sumTo' } } }
    ])
    const transferToSum = transfersToTotal[0]?.sum || 0

    const balance = +(
      incomesSum -
      expensesSum +
      transferToSum -
      transferFromSum
    ).toFixed(2)

    await WalletModel.findByIdAndUpdate(walletId, { balance })
  }

  updateAllUserWalletsBalance = async (userId: string) => {
    const wallets = await WalletModel.find({ user: userId }, { id: 1 })

    return Promise.all(wallets.map(w => this.updateWalletBalance(w.id)))
  }

  // statistics
  getStatistics = async (
    userId: string,
    walletId: string,
    type: OperationType,
    period: { start: string; end: string }
  ): Promise<
    { report: { category: string[]; sum: number }[]; total: number }[]
  > => {
    const start = dayjs(period.start).utc(true).startOf('day').toDate()
    const end = dayjs(period.end).utc(true).endOf('day').toDate()

    return OperationModel.aggregate([
      {
        $match: {
          user: new ObjectId(userId),
          type,
          wallet: new ObjectId(walletId),
          createdAt: { $gte: start, $lte: end }
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $lookup: {
          from: 'wallets',
          localField: 'wallet',
          foreignField: '_id',
          as: 'wallet'
        }
      },
      {
        $group: {
          _id: '$category',
          sum: { $sum: { $round: ['$sum', 2] } },
          currency: { $first: '$wallet.currency' }
        }
      },
      {
        $project: {
          _id: 0,
          category: { $first: '$_id.name' },
          currency: { $first: '$currency' },
          sum: 1
        }
      },
      { $sort: { sum: -1 } }
    ])
  }

  // transfers
  getTransfers = async (
    userId: string,
    period: { start: string; end: string }
  ) => {
    const start = dayjs(period.start).utc(true).startOf('day').toDate()
    const end = dayjs(period.end).utc(true).endOf('day').toDate()

    return TransferModel.find({
      user: userId,
      createdAt: { $gte: start, $lte: end }
    }).transform(res => res.map(transfer => new TransferDto(transfer)))
  }

  addTransfer = async (transfer: Partial<ITransfer>) => {
    const addedTransfer = await TransferModel.create({
      ...transfer,
      createdAt: dayjs(transfer.createdAt).utc(true)
    })

    await this.updateWalletBalance(addedTransfer.from.toString())
    await this.updateWalletBalance(addedTransfer.to.toString())

    return new TransferDto(addedTransfer)
  }

  updateTransfer = async (
    userId: string,
    id: string,
    data: Partial<ITransfer>
  ) => {
    const updatedTransfer = await TransferModel.findByIdAndUpdate(
      id,
      { ...data, createdAt: dayjs(data.createdAt).utc(true) },
      { new: true }
    )

    if (!updatedTransfer) {
      throw ApiError.BadRequest('Transfer is not found')
    }

    await this.updateAllUserWalletsBalance(userId)

    return new TransferDto(updatedTransfer)
  }

  deleteTransfer = async (userId: string, id: string) => {
    const deletedTransfer = await TransferModel.findByIdAndDelete(id)

    await this.updateAllUserWalletsBalance(userId)

    if (!deletedTransfer) {
      throw ApiError.BadRequest('Transfer is not found')
    }

    return new TransferDto(deletedTransfer)
  }

  // categories
  getCategories = async (userId: string, type?: OperationType) => {
    return CategoryModel.find({
      user: userId,
      deletedAt: null,
      type: type || { $exists: true }
    }).transform(categories =>
      categories.map(category => new CategoryDto(category))
    )
  }

  addCategory = async (category: Partial<ICategory>) => {
    const addedCategory = await CategoryModel.create(category)

    return new CategoryDto(addedCategory)
  }

  updateCategory = async (id: string, category: Partial<ICategory>) => {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      category,
      { new: true }
    )

    if (!updatedCategory) {
      throw ApiError.BadRequest('Category is not found')
    }

    return new CategoryDto(updatedCategory)
  }

  deleteCategory = async (id: string) => {
    const deletedCategory = await CategoryModel.findByIdAndUpdate(id, {
      deletedAt: Date.now()
    })

    if (!deletedCategory) {
      throw ApiError.BadRequest('Category is not found')
    }

    return new CategoryDto(deletedCategory)
  }
}

export const service = new Service()
