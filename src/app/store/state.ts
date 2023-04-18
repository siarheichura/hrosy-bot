import { IAppState } from '@app/interfaces'

export const initState: IAppState = {
  operations: [],
  operation: null,
  options: null,
  categories: {
    expense: [],
    income: []
  },
  wallets: [],
  currencies: [],
  statistics: null,
  transfers: null,
  pageTitle: null,
  loading: false,
  error: null
}
