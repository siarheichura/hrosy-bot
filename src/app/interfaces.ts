export interface IAppState {
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
