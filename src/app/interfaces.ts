import { Dayjs } from 'dayjs'

export interface IAppState {
  operations: IDayOperations[]
  operation: IOperation
  categories: ICategories
  wallets: IWallet[]
  currencies: string[]
  statistics: IStatistics
  transfers: ITransfer[]
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
  createdAt: Date
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

export interface ICategories {
  expense: string[]
  income: string[]
}

export interface IGetOperationOptions {
  type: OperationType
  period: IPeriod
  filters: {
    sort: Sort
    wallets?: string[]
    categories?: string[]
    comment?: string
  }
}

export interface IPeriod {
  start: Dayjs
  end: Dayjs
}

export interface IStatistics {
  report: { category: string; sum: number; currency: string }[]
  total: number
}

export interface ITransfer {
  id: string
  from: string // wallet id
  to: string // wallet id
  sumFrom: number
  sumTo: number
  rate: number
  createdAt: Dayjs
}

// --------------------------------------- //
export type Sort = 1 | -1
export type OperationType = 'income' | 'expense'
