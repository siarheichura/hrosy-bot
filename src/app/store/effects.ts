import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'
import * as StoreActions from '@store/actions'
import { HttpService } from '@services/http.service'

@Injectable()
export class Effects {
  constructor(private actions$: Actions, private httpService: HttpService) {}

  // operations
  readonly getOperations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.getOperations),
      switchMap(({ options }) =>
        this.httpService
          .getOperations(options.type, options.start, options.end)
          .pipe(
            map(res =>
              StoreActions.getOperationsSuccess({ operations: res.data })
            )
          )
      )
    )
  )

  // categories
  readonly getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.getCategories),
      switchMap(() =>
        this.httpService.getCategories().pipe(
          map(data =>
            StoreActions.getCategoriesSuccess({ categories: data.data })
          ),
          catchError(error =>
            of(StoreActions.getCategoriesFailure({ error: error.message() }))
          )
        )
      )
    )
  )

  readonly updateCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.updateCategories),
      switchMap(data =>
        this.httpService.updateCategories(data.categories).pipe(
          map(() => StoreActions.getCategories()),
          catchError(error =>
            of(StoreActions.updateCategoriesFailure({ error: error.message }))
          )
        )
      )
    )
  )

  // wallets
  readonly getWallets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.getWallets),
      switchMap(() =>
        this.httpService.getWallets().pipe(
          map(res => StoreActions.getWalletsSuccess({ wallets: res.data })),
          catchError(error =>
            of(StoreActions.getWalletsFailure({ error: error.message }))
          )
        )
      )
    )
  )

  readonly updateWallet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.updateWallet),
      switchMap(data =>
        this.httpService.updateWallet(data.wallets).pipe(
          map(() => StoreActions.getWallets()),
          catchError(error =>
            of(StoreActions.updateWalletFailure({ error: error.message }))
          )
        )
      )
    )
  )

  // currencies
  readonly getAllCurrencies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.getAllCurrencies),
      switchMap(() =>
        this.httpService.getAllCurrencies().pipe(
          map(res =>
            StoreActions.getAllCurrenciesSuccess({ currencies: res.data })
          ),
          catchError(error =>
            of(StoreActions.getAllCurrenciesFailure({ error: error.message }))
          )
        )
      )
    )
  )
}
