import { createAction, props } from '@ngrx/store'
import {
  ICategories,
  IOperation,
  IDayOperations,
  IWallet,
  IGetOperationOptions,
  OperationType,
  IPeriod,
  IStatistics,
  ITransfer
} from '@app//interfaces'

// operations
export const getOperations = createAction(
  '[OPERATIONS] get operations',
  props<{ options: IGetOperationOptions }>()
)
export const getOperationsSuccess = createAction(
  '[OPERATIONS] get operations success',
  props<{ operations: IDayOperations[] }>()
)
export const getOperationsFailure = createAction(
  '[OPERATIONS] get operations failure',
  props<{ error: string }>()
)
export const getOperation = createAction(
  '[OPERATIONS] get operation',
  props<{ id: string }>()
)
export const getOperationSuccess = createAction(
  '[OPERATIONS] get operation success',
  props<{ operation: IOperation }>()
)
export const getOperationFailure = createAction(
  '[OPERATIONS] get operation failure',
  props<{ error: string }>()
)
export const addOperation = createAction(
  '[OPERATIONS] add operation',
  props<{ operation: IOperation }>()
)
export const addOperationFailure = createAction(
  '[OPERATIONS] add operation failure',
  props<{ error: string }>()
)
export const updateOperation = createAction(
  '[OPERATIONS] update operation',
  props<{ operation: IOperation }>()
)
export const updateOperationFailure = createAction(
  '[OPERATIONS] update operation failure',
  props<{ error: string }>()
)
export const deleteOperation = createAction(
  '[OPERATIONS] delete operation',
  props<{ id: string }>()
)
export const deleteOperationFailure = createAction(
  '[OPERATIONS] delete operation failure',
  props<{ error: string }>()
)

// categories
export const getCategories = createAction('[CATEGORIES] get categories')
export const getCategoriesSuccess = createAction(
  '[CATEGORIES] get categories success',
  props<{ categories: ICategories }>()
)
export const getCategoriesFailure = createAction(
  '[CATEGORIES] get categories failure',
  props<{ error: string }>()
)
export const updateCategories = createAction(
  '[CATEGORIES] update categories',
  props<{ categories: ICategories }>()
)
export const updateCategoriesSuccess = createAction(
  '[CATEGORIES] update categories',
  props<{ categories: ICategories }>()
)
export const updateCategoriesFailure = createAction(
  '[CATEGORIES] update categories',
  props<{ error: string }>()
)

// wallets
export const getWallets = createAction('[WALLETS] get wallets')
export const getWalletsSuccess = createAction(
  '[WALLETS] get wallets success',
  props<{ wallets: IWallet[] }>()
)
export const getWalletsFailure = createAction(
  '[WALLETS] get wallets failure',
  props<{ error: string }>()
)
export const addWallet = createAction(
  '[WALLETS] add wallet',
  props<{ wallet: IWallet }>()
)
export const addWalletFailure = createAction(
  '[WALLETS] add wallet failure',
  props<{ error: string }>()
)
export const updateWallet = createAction(
  '[WALLETS] update wallet',
  props<{ wallet: IWallet }>()
)
export const updateWalletFailure = createAction(
  '[WALLETS] update wallet failure',
  props<{ error: string }>()
)
export const deleteWallet = createAction(
  '[WALLETS] delete wallet',
  props<{ id: string }>()
)
export const deleteWalletFailure = createAction(
  '[WALLETS] delete wallet failure',
  props<{ error: string }>()
)

// transfers
export const getTransfers = createAction(
  '[TRANSFERS] get transfers',
  props<{ period: IPeriod }>()
)
export const getTransfersSuccess = createAction(
  '[TRANSFERS] get transfers success',
  props<{ transfers: ITransfer[] }>()
)
export const getTransfersFailure = createAction(
  '[TRANSFERS] get transfers failure',
  props<{ error: string }>()
)
export const addTransfer = createAction(
  '[TRANSFERS] add transfer',
  props<{ transfer: ITransfer }>()
)
export const addTransferSuccess = createAction(
  '[TRANSFERS] add transfer success',
  props<{ transfer: ITransfer }>()
)
export const addTransferFailure = createAction(
  '[TRANSFERS] add transfer failure',
  props<{ error: string }>()
)
export const updateTransfer = createAction(
  '[TRANSFERS] update transfer',
  props<{ transfer: ITransfer }>()
)
export const updateTransferSuccess = createAction(
  '[TRANSFERS] update transfer success',
  props<{ transfer: ITransfer }>()
)
export const updateTransferFailure = createAction(
  '[TRANSFERS] update transfer failure',
  props<{ error: string }>()
)
export const deleteTransfer = createAction(
  '[TRANSFERS] delete transfer',
  props<{ id: string }>()
)
export const deleteTransferSuccess = createAction(
  '[TRANSFERS] delete transfer success',
  props<{ transfer: ITransfer }>()
)
export const deleteTransferFailure = createAction(
  '[TRANSFERS] delete transfer failure',
  props<{ error: string }>()
)

// statistics
export const getStatistics = createAction(
  '[STATISTICS] get statistics',
  props<{
    options: { type: OperationType; walletId: string; period: IPeriod }
  }>()
)
export const getStatisticsSuccess = createAction(
  '[STATISTICS] get statistics success',
  props<{ statistics: IStatistics }>()
)
export const getStatisticsFailure = createAction(
  '[STATISTICS] get statistics failure',
  props<{ error: string }>()
)

// currencies
export const getAllCurrencies = createAction('[CURRENCIES] get all currencies')
export const getAllCurrenciesSuccess = createAction(
  '[CURRENCIES] get all currencies success',
  props<{ currencies: string[] }>()
)
export const getAllCurrenciesFailure = createAction(
  '[CURRENCIES] get all currencies failure',
  props<{ error: string }>()
)

// page title
export const setPageTitle = createAction(
  '[PAGE TITLE] set page title',
  props<{ title: string }>()
)

// reset store
export const resetStore = createAction('[RESET] reset store')
