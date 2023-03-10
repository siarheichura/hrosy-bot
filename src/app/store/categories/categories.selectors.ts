import {IAppState} from "../../interfaces/store.interfaces";
import {createSelector} from "@ngrx/store";

export const selectFeature = (state: IAppState) => state.categories

export const categoriesSelector = createSelector(selectFeature, (state) => state.categories)
