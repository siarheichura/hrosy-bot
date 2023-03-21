import { createSelector } from '@ngrx/store'
import { IState } from './store'

export const selectFeature = (state: IState) => state.state

export const categoriesSelector = createSelector(
  selectFeature,
  state => state.categories
)

export const walletsSelector = createSelector(
  selectFeature,
  state => state.wallets
)

export const currenciesSelector = createSelector(
  selectFeature,
  state => state.currencies
)
