import { createReducer, on } from '@ngrx/store'
import * as Actions from './actions'
import { initState } from './state'

export const reducers = createReducer(
  initState,

  // categories
  on(Actions.getCategories, state => ({ ...state })),
  on(Actions.getCategoriesSuccess, (state, action) => ({
    ...state,
    categories: action.categories
  })),
  on(Actions.getCategoriesFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
  on(Actions.updateCategories, state => ({ ...state })),
  on(Actions.updateCategoriesSuccess, (state, action) => ({
    ...state,
    categories: action.categories
  })),
  on(Actions.updateWalletFailure, (state, action) => ({
    ...state,
    error: action.error
  })),

  // wallets
  on(Actions.getWallets, state => ({ ...state })),
  on(Actions.getWalletsSuccess, (state, action) => ({
    ...state,
    wallets: action.wallets
  })),
  on(Actions.getWalletsFailure, (state, action) => ({
    ...state,
    error: action.error
  })),

  // currencies
  on(Actions.getAllCurrencies, state => ({ ...state })),
  on(Actions.getAllCurrenciesSuccess, (state, action) => ({
    ...state,
    currencies: action.currencies
  })),
  on(Actions.getAllCurrenciesFailure, (state, action) => ({
    ...state,
    error: action.error
  }))
)
