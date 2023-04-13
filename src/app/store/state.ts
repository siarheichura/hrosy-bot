import { IAppState } from '@app/interfaces'

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
  transfers: null,
  error: null
}
