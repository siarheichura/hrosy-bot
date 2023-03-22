import { createAction, props } from '@ngrx/store'
import {
  ICategories,
  IOperation,
  IDayOperations,
  IWallets,
  OperationType
} from '../interfaces'
import { Dayjs } from 'dayjs'

// operations
export const getOperations = createAction(
  '[OPERATIONS] get operations',
  props<{ options: { type: OperationType; start: Dayjs; end: Dayjs } }>()
)
export const getOperationsSuccess = createAction(
  '[OPERATIONS] get operations success',
  props<{ operations: IDayOperations[] }>()
)
export const getOperationsFailure = createAction(
  '[OPERATIONS] get operations failure',
  props<{ error: string }>()
)
export const updateOperation = createAction(
  '[OPERATIONS] update operation',
  props<{ id: string; operation: IOperation }>()
)
export const updateOperationSuccess = createAction(
  '[OPERATIONS] update operation success',
  props<{ operations: IDayOperations[] }>()
)
export const updateOperationFailure = createAction(
  '[OPERATIONS] update operation failure',
  props<{ error: string }>()
)
export const deleteOperation = createAction(
  '[OPERATIONS] delete operation',
  props<{ id: string }>()
)
export const deleteOperationSuccess = createAction(
  '[OPERATIONS] delete operation success',
  props<{ operations: IOperation[] }>()
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
  props<{ wallets: IWallets }>()
)
export const getWalletsFailure = createAction(
  '[WALLETS] get wallets failure',
  props<{ error: string }>()
)
export const updateWallet = createAction(
  '[WALLETS] update wallet',
  props<{ wallets: IWallets }>()
)
export const updateWalletSuccess = createAction(
  '[WALLETS] update wallet success',
  props<{ wallets: IWallets }>()
)
export const updateWalletFailure = createAction(
  '[WALLETS] update wallet failure',
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

// reset store
export const resetStore = createAction('[RESET STORE] reset store')
