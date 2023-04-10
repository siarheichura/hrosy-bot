import { IAppState } from '../interfaces'

export const initState: IAppState = {
  operations: [],
  operation: null,
  categories: {
    expense: [],
    income: []
  },
  wallets: [],
  currencies: [],
  statistics: null,
  error: null
}
