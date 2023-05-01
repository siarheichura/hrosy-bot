import { createReducer, on } from '@ngrx/store'
import * as Actions from '@store/actions'
import { initState } from '@store/state'

export const reducers = createReducer(
  initState,

  // operations
  on(Actions.getOperations, (state, actions) => ({
    ...state,
    options: actions.options
    // loading: true
  })),
  on(Actions.getOperationsSuccess, (state, action) => ({
    ...state,
    operations: action.operations
    // loading: false
  })),
  on(Actions.getOperationsFailure, (state, action) => ({
    ...state,
    error: action.error
    // loading: false
  })),
  on(Actions.getOperation, state => ({ ...state })),
  on(Actions.getOperationSuccess, (state, action) => ({
    ...state,
    operation: action.operation
  })),
  on(Actions.getOperationFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
  on(Actions.addOperation, state => ({
    ...state
    // loading: true
  })),
  on(Actions.addOperationFailure, (state, action) => ({
    ...state,
    error: action.error
    // loading: false
  })),
  on(Actions.updateOperation, state => ({
    ...state
    // loading: true
  })),
  on(Actions.updateOperationFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false
  })),
  on(Actions.deleteOperation, state => ({
    ...state
    // loading: true
  })),
  on(Actions.deleteOperationFailure, (state, action) => ({
    ...state,
    error: action.error
    // loading: false
  })),

  // categories
  on(Actions.getCategories, state => ({
    ...state
    // loading: true
  })),
  on(Actions.getCategoriesSuccess, (state, action) => ({
    ...state,
    categories: action.categories
    // loading: false
  })),
  on(Actions.getCategoriesFailure, (state, action) => ({
    ...state,
    error: action.error
    // loading: false
  })),
  on(Actions.addCategory, state => ({
    ...state
    // loading: true
  })),
  on(Actions.addCategorySuccess, (state, action) => ({
    ...state,
    categories: [...state.categories, action.category]
    // loading: false
  })),
  on(Actions.addCategoryFailure, (state, action) => ({
    ...state,
    error: action.error
    // loading: false
  })),
  on(Actions.updateCategory, state => ({
    ...state
    // loading: true
  })),
  on(Actions.updateCategorySuccess, (state, action) => ({
    ...state,
    categories: state.categories.map(c =>
      c.id === action.category.id ? action.category : c
    )
    // loading: false
  })),
  on(Actions.updateCategoryFailure, (state, action) => ({
    ...state,
    error: action.error
    // loading: false
  })),
  on(Actions.updateCategory, state => ({
    ...state
    // loading: true
  })),
  on(Actions.deleteCategorySuccess, (state, action) => ({
    ...state,
    categories: state.categories.filter(c => c.id !== action.category.id)
    // loading: false
  })),
  on(Actions.deleteCategoryFailure, (state, action) => ({
    ...state,
    error: action.error
    // loading: false
  })),

  // wallets
  on(Actions.getWallets, state => ({
    ...state
    // loading: true
  })),
  on(Actions.getWalletsSuccess, (state, action) => ({
    ...state,
    wallets: action.wallets
    // loading: false
  })),
  on(Actions.getWalletsFailure, (state, action) => ({
    ...state,
    error: action.error
    // loading: false
  })),
  on(Actions.addWallet, state => ({
    ...state
    // loading: true
  })),
  on(Actions.addWalletFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
  on(Actions.updateWallet, state => ({
    ...state
    // loading: true
  })),
  on(Actions.updateWalletFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
  on(Actions.deleteWallet, state => ({
    ...state
    // loading: true
  })),
  on(Actions.deleteWalletFailure, state => ({
    ...state
    // loading: false
  })),

  // transfers
  on(Actions.getTransfers, state => ({
    ...state
    // loading: true
  })),
  on(Actions.getTransfersSuccess, (state, action) => ({
    ...state,
    transfers: action.transfers
    // loading: false
  })),
  on(Actions.getTransfersFailure, (state, action) => ({
    ...state,
    error: action.error
    // loading: false
  })),
  on(Actions.addTransfer, state => ({
    ...state
    // loading: true
  })),
  on(Actions.addTransferSuccess, (state, action) => ({
    ...state,
    transfers: [...state.transfers, action.transfer]
    // loading: false
  })),
  on(Actions.addTransferFailure, (state, action) => ({
    ...state,
    error: action.error
    // loading: false
  })),
  on(Actions.updateTransfer, state => ({
    ...state
    // loading: true
  })),
  on(Actions.updateTransferSuccess, (state, action) => ({
    ...state,
    transfers: state.transfers.map(t =>
      t.id === action.transfer.id ? action.transfer : t
    )
    // loading: false
  })),
  on(Actions.updateTransferFailure, (state, action) => ({
    ...state,
    error: action.error
    // loading: false
  })),
  on(Actions.deleteTransfer, state => ({
    ...state
    // loading: true
  })),
  on(Actions.deleteTransferSuccess, (state, action) => ({
    ...state,
    transfers: state.transfers.filter(t => t.id !== action.transfer.id)
    // loading: false
  })),
  on(Actions.deleteTransferFailure, (state, action) => ({
    ...state,
    error: action.error
    // loading: false
  })),

  // statistics
  on(Actions.getStatistics, state => ({
    ...state
    // loading: true
  })),
  on(Actions.getStatisticsSuccess, (state, action) => ({
    ...state,
    statistics: action.statistics
    // loading: false
  })),
  on(Actions.getStatisticsFailure, (state, action) => ({
    ...state,
    error: action.error
    // loading: false
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
    operation: null,
    options: null,
    categories: [],
    currencies: [],
    statistics: null,
    transfers: null,
    pageTitle: null,
    loading: false,
    error: null
  }))
)
