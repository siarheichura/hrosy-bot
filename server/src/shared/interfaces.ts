import { Context } from 'telegraf'
import { IOperation } from '../models/Operation'

export interface ISessionData {
  userId: string,
  operation: Partial<IOperation>,
}

export interface IContext extends Context {
  session: ISessionData;
}

export interface ICategories {
  expense: string[],
  income: string[]
}

export interface IDayOperations {
  date: Date
  operations: {
    id: string
    wallet: {
      id: string
      name: string
      currency: string
    }
    type: OperationType
    category: {
      id: string
      name: string
    }
    sum: number
    currency: string
    comment: string
    createdAt: string
  }[]
}

export type OperationType = 'income' | 'expense'
