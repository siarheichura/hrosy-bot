import { ActionReducerMap } from '@ngrx/store'
import { IAppState } from '../interfaces/store.interfaces'
import { categoriesReducers } from './categories/categories.reducers'

export const reducers: ActionReducerMap<IAppState> = {
  categories: categoriesReducers,
}
