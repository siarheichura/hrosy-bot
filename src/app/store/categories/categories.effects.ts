import { Injectable } from '@angular/core'
import { Actions, ofType } from '@ngrx/effects'
import * as CategoriesActions from './categories.actions'
import { catchError, map, of, switchMap } from 'rxjs'

@Injectable()
export class CategoriesEffect {
  constructor(
    private actions$: Actions,
    // private categoriesService: CategoriesService
  ) {
  }

  getCategories$ = this.actions$.pipe(
    ofType(CategoriesActions.getCategories),
    // switchMap(() => this.categoriesService.getCategories().pipe(
    //     map(categories => CategoriesActions.getCategoriesSuccess),
    //     catchError(error => of(CategoriesActions.getCategoriesFailure({error: error.message})))
    //   )
    // )
  )
}
