import {createReducer, on} from "@ngrx/store";
import * as CategoriesActions from './categories.actions'
import {initCategoriesState} from "./categories.state";

export const categoriesReducers = createReducer(
  initCategoriesState,
  on(CategoriesActions.getCategories, (state) => ({...state})),
  on(CategoriesActions.getCategoriesSuccess, (state, action) => ({...state, categories: action.categories})),
  on(CategoriesActions.getCategoriesFailure, (state, action) => ({...state, error: action.error}))
)
