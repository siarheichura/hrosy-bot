import { createSelector } from '@ngrx/store'
import { IState } from '@store/store'

export const selectFeature = (state: IState) => state.state

export const operationsSelector = createSelector(
  selectFeature,
  state => state.operations
)
export const operationSelector = createSelector(
  selectFeature,
  state => state.operation
)
export const operationsOptionsSelector = createSelector(
  selectFeature,
  state => state.options
)

export const categoriesSelector = createSelector(
  selectFeature,
  state => state.categories
)

export const walletsSelector = createSelector(
  selectFeature,
  state => state.wallets
)

export const transfersSelector = createSelector(
  selectFeature,
  state => state.transfers
)

export const statisticsSelector = createSelector(
  selectFeature,
  state => state.statistics
)

export const currenciesSelector = createSelector(
  selectFeature,
  state => state.currencies
)

export const pageTitleSelector = createSelector(
  selectFeature,
  state => state.pageTitle
)

export const loadingSelector = createSelector(
  selectFeature,
  state => state.loading
)
