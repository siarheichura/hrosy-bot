import { IAppState } from '@app/interfaces'

export const initState: IAppState = {
  operations: [],
  operation: null,
  options: null,
  categories: [],
  wallets: [],
  currencies: [],
  statistics: null,
  transfers: null,
  loading: false,
  error: null
}
