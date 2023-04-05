import { createReducer, on } from '@ngrx/store'
import * as Actions from '@store/actions'
import { initState } from '@store/state'

export const reducers = createReducer(
  initState,

  // OPERATIONS
  // get operations
  on(Actions.getOperations, state => ({ ...state })),
  on(Actions.getOperationsSuccess, (state, action) => ({
    ...state,
    operations: action.operations
  })),
  on(Actions.getOperationsFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
  //get operation
  on(Actions.getOperation, state => ({ ...state })),
  on(Actions.getOperationSuccess, (state, action) => ({
    ...state,
    operation: action.operation
  })),
  on(Actions.getOperationFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
  // add operation
  on(Actions.addOperation, state => ({ ...state })),
  on(Actions.addOperationFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
  // update operation
  on(Actions.updateOperation, state => ({ ...state })),
  on(Actions.updateOperationSuccess, state => ({ ...state })),
  on(Actions.updateOperationFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
  // delete operation
  on(Actions.deleteOperation, state => ({ ...state })),
  on(Actions.deleteOperationSuccess, state => ({ ...state })),
  on(Actions.deleteOperationFailure, (state, action) => ({
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
  // on(Actions.updateWalletFailure, (state, action) => ({
  //   ...state,
  //   error: action.error
  // })),

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
  on(Actions.addWallet, state => ({ ...state })),
  on(Actions.addWalletFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
  on(Actions.updateWallet, state => ({ ...state })),
  on(Actions.updateWalletFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
  on(Actions.deleteWallet, state => ({ ...state })),

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

  // catch error
  // on(Actions.catchError, (state, action) => ({
  //   ...state,
  //   error: action.type
  // })),

  on(Actions.resetError, state => ({ ...state, error: null })),

  // reset store
  on(Actions.resetStore, state => ({
    ...state,
    operations: [],
    currencies: [],
    error: null
  }))
)
