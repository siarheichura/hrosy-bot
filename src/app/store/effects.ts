import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, of, switchMap } from 'rxjs'
import * as StoreActions from '@store/actions'
import { HttpService } from '@services/http.service'
import { SnackBarService } from '@services/snack-bar.service'
import { Router } from '@angular/router'

@Injectable()
export class Effects {
  constructor(
    private actions$: Actions,
    private httpService: HttpService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  // operations
  readonly getOperations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.getOperations),
      switchMap(({ options }) =>
        this.httpService
          .getOperations(options)
          .pipe(
            map(res =>
              StoreActions.getOperationsSuccess({ operations: res.data })
            )
          )
      )
    )
  )

  readonly getOperation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.getOperation),
      switchMap(({ id }) =>
        this.httpService.getOperation(id).pipe(
          map(res => StoreActions.getOperationSuccess({ operation: res.data })),
          catchError(err => {
            this.snackBarService.printInfoSnackBar('error', err.error)
            return of(StoreActions.getOperationFailure({ error: err.error }))
          })
        )
      )
    )
  )

  readonly addOperation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.addOperation),
      switchMap(({ operation }) =>
        this.httpService.addOperation(operation).pipe(
          mergeMap(res => {
            this.snackBarService.printInfoSnackBar('success', res.message)
            void this.router.navigate([`operations/${res.data.type}`])
            return [
              StoreActions.addOperationSuccess(),
              StoreActions.getWallets()
            ]
          }),
          catchError(err => {
            this.snackBarService.printInfoSnackBar('error', err.error)
            return of(StoreActions.addOperationFailure({ error: err.error }))
          })
        )
      )
    )
  )

  readonly updateOperation = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.updateOperation),
      switchMap(({ operation }) =>
        this.httpService.updateOperation(operation).pipe(
          mergeMap(res => {
            this.snackBarService.printInfoSnackBar('success', res.message)
            void this.router.navigate([`operations/${res.data.type}`])
            return [
              StoreActions.updateOperationSuccess(),
              StoreActions.getWallets()
            ]
          }),
          catchError(err => {
            this.snackBarService.printInfoSnackBar('error', err.error)
            return of(StoreActions.updateOperationFailure({ error: err.error }))
          })
        )
      )
    )
  )

  readonly deleteOperation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.deleteOperation),
      switchMap(({ id }) =>
        this.httpService.deleteOperation(id).pipe(
          mergeMap(res => {
            this.snackBarService.printInfoSnackBar('success', res.message)
            void this.router.navigate([`operations/${res.data.type}`])
            return [
              StoreActions.deleteOperationSuccess(),
              StoreActions.getWallets()
            ]
          }),
          catchError(err => {
            this.snackBarService.printInfoSnackBar('error', err.error)
            return of(StoreActions.deleteOperationFailure({ error: err.error }))
          })
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
          catchError(err => {
            this.snackBarService.printInfoSnackBar('error', err.error)
            return of(StoreActions.getWalletsFailure({ error: err.error }))
          })
        )
      )
    )
  )

  readonly addWallet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.addWallet),
      switchMap(({ data }) =>
        this.httpService
          .addWallet({
            name: data.name,
            currency: data.currency,
            isMain: data.isMain
          })
          .pipe(
            map(res => {
              this.snackBarService.printInfoSnackBar('success', res.message)
              void this.router.navigate(['wallets'])
              return StoreActions.getWallets()
            }),
            catchError(err => {
              this.snackBarService.printInfoSnackBar('error', err.error)
              return of(StoreActions.addWalletFailure({ error: err.message }))
            })
          )
      )
    )
  )

  readonly updateWallet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.updateWallet),
      switchMap(({ data }) =>
        this.httpService
          .updateWallet({
            id: data.id,
            name: data.name,
            currency: data.currency,
            isMain: data.isMain
          })
          .pipe(
            map(res => {
              this.snackBarService.printInfoSnackBar('success', res.message)
              void this.router.navigate(['wallets'])
              return StoreActions.getWallets()
            }),
            catchError(err => {
              this.snackBarService.printInfoSnackBar('error', err.error)
              return of(StoreActions.updateWalletFailure({ error: err.error }))
            })
          )
      )
    )
  )

  readonly deleteWallet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.deleteWallet),
      switchMap(({ id }) =>
        this.httpService.deleteWallet(id).pipe(
          map(res => {
            this.snackBarService.printInfoSnackBar('success', res.message)
            void this.router.navigate(['wallets'])
            return StoreActions.getWallets()
          }),
          catchError(err => {
            this.snackBarService.printInfoSnackBar('error', err.error)
            return of(StoreActions.deleteWalletFailure({ error: err.error }))
          })
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
