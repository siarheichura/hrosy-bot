import { ObjectId } from 'mongodb'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { UserModel, IUser } from '../models/User'
import { OperationModel, IOperation } from '../models/Operation'
import { WalletModel, IWallet } from '../models/Wallet'
import { ICategories, IDayOperations, OperationType } from '../shared/interfaces'
import { BASIC_EXPENSE_CATEGORIES, BASIC_INCOME_CATEGORIES, BASIC_WALLETS } from '../telegram/constants'
import { OPERATION_TYPES } from '../shared/enums'
import { ITransfer, TransferModel } from '../models/Transfer'
import { TransferDto } from './dtos/transfer.dto'
import { OperationDto } from './dtos/operation.dto'
import { CategoryModel, ICategory } from '../models/Category'
import { CategoryDto } from './dtos/category.dto'
import { WalletDto } from './dtos/wallet.dto'

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
    await Promise.all(BASIC_WALLETS.map(wallet => WalletModel.create({
      user: addedUser._id,
      name: wallet.name,
      isMain: wallet.isMain
    })))

    // add initial user categories to db
    await Promise.all(BASIC_EXPENSE_CATEGORIES.map(c => CategoryModel.create({
      user: addedUser._id,
      name: c,
      type: OPERATION_TYPES.EXPENSE
    })))
    await Promise.all(BASIC_INCOME_CATEGORIES.map(c => CategoryModel.create({
      user: addedUser._id,
      name: c,
      type: OPERATION_TYPES.INCOME
    })))

    return addedUser
  }

  getUser = async (chatId: string) => {
    return UserModel.findOne({ chatId })
  }

  // operations
  getOperations = async (
    chatId: string,
    type: OperationType,
    period: { start: string, end: string },
    filters: { sort: 1 | -1, wallets?: string[], categories?: string[], comment?: string }
  ): Promise<IDayOperations[]> => {
    const user = await UserModel.findOne({ chatId }, { _id: 1 })
    const start = dayjs(period.start).utc(true).startOf('day').toDate()
    const end = dayjs(period.end).utc(true).endOf('day').toDate()
    const { sort, wallets, categories, comment } = filters

    return OperationModel.aggregate([
      {
        $match: {
          user: user!._id,
          type,
          createdAt: { $gte: start, $lte: end },
          wallet: wallets ? { $in: wallets.map(id => new ObjectId(id)) } : { $exists: true },
          category: categories ? { $in: categories } : { $exists: true },
          comment: comment ? { $regex: comment, $options: 'i' } : { $exists: true }
        }
      },
      {
        $lookup: {
          from: 'wallets',
          localField: 'wallet',
          foreignField: '_id',
          as: 'wallet',
          pipeline: [
            { $project: { _id: 0, id: '$_id', name: 1, currency: 1 } }
          ]
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
          pipeline: [
            { $project: { _id: 0, id: '$_id', name: 1 } }
          ]
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
    try {
      const operation = await OperationModel.findById(id)

      if (!operation) {
        throw 'operation is not found'
      }

      return new OperationDto(operation)
    } catch (err) {
      console.log(err)
      throw err.message
    }
  }

  addOperation = async (operation: Partial<IOperation>) => {
    try {
      const addedOperation = await OperationModel.create({
        ...operation,
        createdAt: dayjs(operation.createdAt).utc(true)
      })

      await this.updateWalletBalance(addedOperation.wallet.toString())

      return new OperationDto(addedOperation)
    } catch (err) {
      console.log(err)
      throw err.message
    }
  }

  updateOperation = async (operationId: string, operation: Partial<IOperation>) => {
    try {
      const updatedOperation = await OperationModel.findByIdAndUpdate(
        operationId,
        { ...operation, createdAt: dayjs(operation.createdAt).utc(true) },
        { new: true }
      )

      if (!updatedOperation) {
        throw 'operation is not found'
      }

      const { user } = updatedOperation
      const wallets = await WalletModel.find({ user }, { id: 1 })
      await Promise.all(wallets.map(w => this.updateWalletBalance(w.id)))

      return new OperationDto(updatedOperation)
    } catch (err) {
      console.log(err)
      throw err.message
    }
  }

  deleteOperation = async (id: string) => {
    try {
      const deletedOperation = await OperationModel.findByIdAndDelete(id)

      if (!deletedOperation) {
        throw 'operation is not found'
      }

      await this.updateWalletBalance(deletedOperation.wallet.toString())

      return new OperationDto(deletedOperation)
    } catch (err) {
      console.log(err)
      throw err.message
    }
  }

  // wallets
  getWallets = async (userId: string) => {
    try {
      return WalletModel.find({ user: userId, deletedAt: null })
        .sort({ isMain: -1 })
        .transform(wallets => wallets.map(wallet => new WalletDto(wallet)))
    } catch (err) {
      console.log(err)
      throw err.message
    }
  }

  addWallet = async (userId: string, wallet: Partial<IWallet>) => {
    try {
      const createdWallet = await WalletModel.create({ ...wallet, user: userId })

      if (wallet.isMain) {
        await WalletModel.updateMany(
          { user: userId, _id: { $ne: createdWallet._id } },
          { isMain: false }
        )
      }

      return new WalletDto(createdWallet)
    } catch (err) {
      console.log(err)
      throw err.message
    }
  }

  deleteWallet = async (id: string) => {
    try {
      const deletedWallet = await WalletModel.findByIdAndUpdate(id, { deletedAt: Date.now() })

      if (!deletedWallet) {
        throw 'wallet is not found'
      }

      // await OperationModel.deleteMany({ wallet: id })

      return new WalletDto(deletedWallet)
    } catch (err) {
      console.log(err)
      throw err.message
    }
  }

  updateWallet = async (userId: string, id: string, data: Partial<IWallet>) => {
    try {
      const updatedWallet = await WalletModel.findByIdAndUpdate(
        id,
        { ...data },
        { new: true }
      )

      if (!updatedWallet) {
        throw 'wallet is not found'
      }

      if (data.isMain) {
        await WalletModel.updateMany(
          { user: userId, _id: { $ne: updatedWallet._id } },
          { isMain: false }
        )
      }

      await OperationModel.updateMany(
        { wallet: id },
        { currency: data.currency }
      )

      return new WalletDto(updatedWallet)
    } catch (err) {
      console.log(err)
      throw err.message
    }
  }

  updateWalletBalance = async (walletId: string) => {
    try {
      const operationsTotal = await OperationModel.aggregate([
        { $match: { wallet: new ObjectId(walletId) } },
        { $group: { _id: '$type', sum: { $sum: '$sum' } } },
        { $project: { _id: 0, type: '$_id', sum: 1 } }
      ])
      const incomesSum = operationsTotal.find(i => i.type === OPERATION_TYPES.INCOME)?.sum || 0
      const expensesSum = operationsTotal.find(i => i.type === OPERATION_TYPES.EXPENSE)?.sum || 0

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


      const balance = +(incomesSum - expensesSum + transferToSum - transferFromSum).toFixed(2)

      await WalletModel.findByIdAndUpdate(walletId, { balance })
    } catch (err) {
      console.log(err)
      throw err.message
    }
  }

  updateAllUserWalletsBalance = async (userId: string) => {
    try {
      const wallets = await WalletModel.find({ user: userId }, { id: 1 })

      return Promise.all(wallets.map(w => this.updateWalletBalance(w.id)))
    } catch (err) {
      console.log(err)
      throw err.message
    }
  }

  // statistics
  getStatistics = async (
    userId: string,
    walletId: string,
    type: OperationType,
    period: { start: string, end: string }
  ): Promise<{ report: { category: string[], sum: number } [], total: number }[]> => {
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
      { $group: { _id: '$category', sum: { $sum: '$sum' }, currency: { $first: '$currency' } } },
      { $project: { _id: 0, category: '$_id', sum: { $sum: { $round: ['$sum', 2] } }, currency: 1 } },
      { $sort: { sum: -1 } },
      { $group: { _id: null, report: { $push: '$$ROOT' }, total: { $sum: '$sum' } } },
      { $project: { _id: 0, report: '$report', total: { $round: ['$total', 2] } } }
    ])
  }

  // transfers
  getTransfers = async (
    userId: string,
    period: { start: string, end: string }
  ) => {
    try {
      const start = dayjs(period.start).utc(true).startOf('day').toDate()
      const end = dayjs(period.end).utc(true).endOf('day').toDate()

      return TransferModel.find({
        user: userId,
        createdAt: { $gte: start, $lte: end }
      }).transform(res => res.map(transfer => new TransferDto(transfer)))
    } catch (err) {
      console.log(err)
      throw err.message
    }
  }

  addTransfer = async (transfer: Partial<ITransfer>) => {
    try {
      const addedTransfer = await TransferModel.create({
        ...transfer,
        createdAt: dayjs(transfer.createdAt).utc(true)
      })

      await this.updateWalletBalance(addedTransfer.from.toString())
      await this.updateWalletBalance(addedTransfer.to.toString())

      return new TransferDto(addedTransfer)
    } catch (err) {
      console.log(err)
      throw err.message
    }
  }

  updateTransfer = async (userId: string, id: string, data: Partial<ITransfer>) => {
    try {
      const updatedTransfer = await TransferModel.findByIdAndUpdate(
        id,
        { ...data, createdAt: dayjs(data.createdAt).utc(true) },
        { new: true }
      )

      if (!updatedTransfer) {
        throw 'transfer is not found'
      }

      await this.updateAllUserWalletsBalance(userId)

      return new TransferDto(updatedTransfer)
    } catch (err) {
      console.log(err)
      throw err.message
    }
  }

  deleteTransfer = async (userId: string, id: string) => {
    try {
      const deletedTransfer = await TransferModel.findByIdAndDelete(id)

      await this.updateAllUserWalletsBalance(userId)

      if (!deletedTransfer) {
        throw 'transfer is not found'
      }

      return new TransferDto(deletedTransfer)
    } catch (err) {
      console.log(err)
      throw err.message
    }
  }

  // categories
  getCategories = async (userId: string, type?: OperationType) => {
    try {
      return CategoryModel.find({
        user: userId,
        deletedAt: null,
        type: type || { $exists: true }
      })
        .transform(categories => categories.map(category => new CategoryDto(category)))
    } catch (err) {
      console.log(err)
      throw err.message
    }
  }

  addCategory = async (category: Partial<ICategory>) => {
    try {
      const addedCategory = await CategoryModel.create(category)

      return new CategoryDto(addedCategory)
    } catch (err) {
      console.log(err)
      throw err.message
    }
  }

  updateCategory = async (id: string, category: Partial<ICategory>) => {
    try {
      const updatedCategory = await CategoryModel.findByIdAndUpdate(
        id,
        category,
        { new: true }
      )

      if (!updatedCategory) {
        throw 'category is not found'
      }

      return new CategoryDto(updatedCategory)
    } catch (err) {
      console.log(err)
      throw err.message
    }
  }

  deleteCategory = async (id: string) => {
    try {
      // const deletedCategory = await CategoryModel.findByIdAndDelete(id)
      const deletedCategory = await CategoryModel.findByIdAndUpdate(id, { deletedAt: Date.now() })

      if (!deletedCategory) {
        throw 'category is not found'
      }

      return new CategoryDto(deletedCategory)
    } catch (err) {
      console.log(err)
      throw err.message
    }
  }

  updateCategories = async (chatId: string, categories: ICategories): Promise<{ message: string }> => {
    await UserModel.findOneAndUpdate({ chatId }, { categories })
    return { message: 'categories updated' }
  }
}

export const service = new Service()
