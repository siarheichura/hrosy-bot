import { Dayjs } from 'dayjs'

export interface IAppState {
  operations: IDayOperations[]
  operation: IOperation
  categories: ICategories
  wallets: IWallet[]
  currencies: string[]
  error: string
}

export interface IHttpResponse<T> {
  data: T
  error?: string
  message?: string
}

export interface IOperation {
  id: string
  wallet: string
  type: OperationType
  category: string
  sum: number
  currency: string
  comment: string
  createdAt: Date | Dayjs | string
}

export interface IDayOperations {
  date: Date
  operations: IOperation[]
}

export interface IWallet {
  id: string
  name: string
  currency: string
  balance: number
  isMain: boolean
}

export interface IWallets {
  wallet: IWallet
  stash: IWallet
}

export interface ICategories {
  expense: string[]
  income: string[]
}

// --------------------------------------- //

export type OperationType = 'income' | 'expense'
