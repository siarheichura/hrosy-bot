import { IAppState } from '../interfaces'

export const initState: IAppState = {
  categories: {
    expense: [],
    income: []
  },
  wallets: {
    wallet: {
      balance: 0,
      currency: ''
    },
    stash: {
      balance: 0,
      currency: ''
    }
  },
  currencies: [],
  error: null
}
