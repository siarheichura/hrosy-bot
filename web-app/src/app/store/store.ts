import { ActionReducerMap } from '@ngrx/store'
import { reducers } from '@store/reducers'
import { IAppState } from '@app/interfaces'

export interface IState {
  state: IAppState
}

export const reducer: ActionReducerMap<IState> = {
  state: reducers
}
