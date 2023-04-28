import { Routes } from '@angular/router'
import { ROUTES_ENUM } from '@constants/enums'

export const routes: Routes = [
  // REMOVE THIS AND MAIN COMPONENT
  // {
  //   path: ROUTES_ENUM.INDEX,
  //   component: MainComponent,
  //   data: { state: 'index' }
  // },
  {
    path: ROUTES_ENUM.INDEX,
    redirectTo: ROUTES_ENUM.OPERATIONS,
    pathMatch: 'full'
  },
  {
    path: ROUTES_ENUM.OPERATIONS,
    loadComponent: () =>
      import('@pages/operations/operations.component').then(
        m => m.OperationsComponent
      )
  },
  // REMOVE
  // {
  //   path: `${ROUTES_ENUM.OPERATIONS}/:type`,
  //   loadComponent: () =>
  //     import('@pages/operations/operations.component').then(
  //       m => m.OperationsComponent
  //     )
  // },
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
