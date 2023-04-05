import { Routes } from '@angular/router'
import { ROUTES_ENUM } from '@constants/enums'
import { MainComponent } from '@pages/main/main.component'

export const routes: Routes = [
  {
    path: ROUTES_ENUM.INDEX,
    component: MainComponent,
    data: { state: 'index' }
  },
  {
    path: `${ROUTES_ENUM.OPERATIONS}/:type`,
    loadComponent: () =>
      import('@pages/operations/operations.component').then(
        m => m.OperationsComponent
      )
  },
  {
    path: `${ROUTES_ENUM.OPERATIONS}/:type/edit/:id`,
    loadComponent: () =>
      import('@pages/add-edit-operation/add-edit-operation.component').then(
        m => m.AddEditOperationComponent
      )
  },
  {
    path: `${ROUTES_ENUM.OPERATIONS}/:type/add`,
    loadComponent: () =>
      import('@pages/add-edit-operation/add-edit-operation.component').then(
        m => m.AddEditOperationComponent
      )
  },
  {
    path: ROUTES_ENUM.CATEGORIES,
    loadComponent: () =>
      import('@pages/categories/categories.component').then(
        m => m.CategoriesComponent
      )
  },
  {
    path: ROUTES_ENUM.WALLETS,
    loadComponent: () =>
      import('@pages/wallets/wallets.component').then(m => m.WalletsComponent)
  },
  {
    path: `${ROUTES_ENUM.WALLETS}/edit/:id`,
    loadComponent: () =>
      import('@pages/add-edit-wallet/add-edit-wallet.component').then(
        m => m.AddEditWalletComponent
      )
  },
  {
    path: `${ROUTES_ENUM.WALLETS}/add`,
    loadComponent: () =>
      import('@pages/add-edit-wallet/add-edit-wallet.component').then(
        m => m.AddEditWalletComponent
      )
  },
  {
    path: ROUTES_ENUM.TRANSFER,
    loadComponent: () =>
      import('@pages/transfers/transfers.component').then(
        m => m.TransfersComponent
      )
  },
  {
    path: ROUTES_ENUM.STATISTICS,
    loadComponent: () =>
      import('@pages/statistics/statistics.component').then(
        m => m.StatisticsComponent
      )
  }
]
