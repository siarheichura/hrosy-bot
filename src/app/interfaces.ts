export interface IAppState {
  operations: IDayOperations[]
  categories: ICategories
  wallets: IWallets
  currencies: string[]
  error: string | null
}

export interface IHttpResponse<T> {
  data: T
  error?: string
  message?: string
}

export interface IOperation {
  id: string
  type: OperationType
  category: string
  sum: number
  comment: string
  createdAt: Date
}

export interface IDayOperations {
  date: Date
  operations: IOperation[]
}

export interface IWallet {
  balance: number
  currency: string
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
