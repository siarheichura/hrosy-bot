import { ActionReducerMap } from '@ngrx/store'
import { reducers } from './reducers'
import { IAppState } from '../interfaces'

export interface IState {
  state: IAppState
}

export const reducer: ActionReducerMap<IState> = {
  state: reducers
}
