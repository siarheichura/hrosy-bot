import { ICategory } from './core.interfaces'

export interface IAppState {
  categories: ICategoriesState
}

export interface ICategoriesState {
  categories: ICategory[]
  error: string | null
}
