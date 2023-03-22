import { createReducer, on } from '@ngrx/store'
import * as Actions from '@store/actions'
import { initState } from '@store/state'

export const reducers = createReducer(
  initState,

  // operations
  on(Actions.getOperations, state => ({ ...state })),
  on(Actions.getOperationsSuccess, (state, action) => ({
    ...state,
    operations: action.operations
  })),
  on(Actions.getOperationsFailure, (state, action) => ({
    ...state,
    error: action.error
  })),

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
  })),

  // reset store
  on(Actions.resetStore, state => ({
    ...state,
    operations: [],
    currencies: [],
    error: null
  }))
)
