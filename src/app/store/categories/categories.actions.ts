import {createAction, props} from "@ngrx/store";
import {ICategory} from "../../interfaces/core.interfaces";

export const getCategories = createAction('[CATEGORIES] get categories')
export const getCategoriesSuccess = createAction(
  '[CATEGORIES] get categories success',
  props<{ categories: ICategory[] }>()
)
export const getCategoriesFailure = createAction(
  '[CATEGORIES] get categories failure',
  props<{ error: string }>()
)
