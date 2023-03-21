import { createAction, props } from '@ngrx/store'
import { ICategories, IWallets } from '../interfaces'

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
