import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import {
  catchError,
  combineLatestWith,
  map,
  mergeMap,
  of,
  switchMap,
  take
} from 'rxjs'
import * as StoreActions from '@store/actions'
import { HttpService } from '@services/http.service'
import { SnackBarService } from '@services/snack-bar.service'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { IState } from '@store/store'
import { operationsOptionsSelector } from '@store/selectors'

@Injectable()
export class Effects {
  actions$ = inject(Actions)
  store: Store<IState> = inject(Store)
  httpService = inject(HttpService)
  router = inject(Router)
  snackBarService = inject(SnackBarService)

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
          combineLatestWith(this.store.select(operationsOptionsSelector)),
          take(1),
          mergeMap(([res, options]) => {
            this.snackBarService.printInfoSnackBar('success', res.message)
            return [
              StoreActions.getOperations({ options }),
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
          combineLatestWith(this.store.select(operationsOptionsSelector)),
          take(1),
          mergeMap(([res, options]) => {
            this.snackBarService.printInfoSnackBar('success', res.message)
            return [
              StoreActions.getOperations({ options }),
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
          combineLatestWith(this.store.select(operationsOptionsSelector)),
          take(1),
          mergeMap(([res, options]) => {
            this.snackBarService.printInfoSnackBar('success', res.message)
            return [
              StoreActions.getOperations({ options }),
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

  // transfers
  readonly getTransfers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.getTransfers),
      switchMap(({ period }) =>
        this.httpService.getTransfers(period).pipe(
          map(res => StoreActions.getTransfersSuccess({ transfers: res.data })),
          catchError(err => {
            this.snackBarService.printInfoSnackBar('error', err.error)
            return of(StoreActions.getTransfersFailure({ error: err.error }))
          })
        )
      )
    )
  )

  readonly addTransfer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.addTransfer),
      switchMap(({ transfer }) =>
        this.httpService.addTransfer(transfer).pipe(
          map(res => {
            this.snackBarService.printInfoSnackBar('success', res.message)
            return StoreActions.addTransferSuccess({ transfer: res.data })
          }),
          catchError(err => {
            this.snackBarService.printInfoSnackBar('error', err.error)
            return of(StoreActions.addTransferFailure({ error: err.message }))
          })
        )
      )
    )
  )

  readonly updateTransfer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.updateTransfer),
      switchMap(({ transfer }) =>
        this.httpService.updateTransfer(transfer).pipe(
          map(res => {
            this.snackBarService.printInfoSnackBar('success', res.message)
            return StoreActions.updateTransferSuccess({ transfer: res.data })
          }),
          catchError(err => {
            this.snackBarService.printInfoSnackBar('error', err.error)
            return of(StoreActions.updateTransferFailure({ error: err.error }))
          })
        )
      )
    )
  )

  readonly deleteTransfer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.deleteTransfer),
      switchMap(({ id }) =>
        this.httpService.deleteTransfer(id).pipe(
          map(res => {
            this.snackBarService.printInfoSnackBar('success', res.message)
            return StoreActions.deleteTransferSuccess({ transfer: res.data })
          }),
          catchError(err => {
            this.snackBarService.printInfoSnackBar('error', err.error)
            return of(StoreActions.deleteTransferFailure({ error: err.error }))
          })
        )
      )
    )
  )

  // statistics
  readonly getStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.getStatistics),
      switchMap(({ options }) =>
        this.httpService
          .getStatistics(options.type, options.walletId, options.period)
          .pipe(
            map(res =>
              StoreActions.getStatisticsSuccess({ statistics: res.data })
            ),
            catchError(error =>
              of(StoreActions.getStatisticsFailure({ error: error.message }))
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
