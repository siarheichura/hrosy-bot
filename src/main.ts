import { bootstrapApplication } from '@angular/platform-browser'
import { importProvidersFrom } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { provideEffects } from '@ngrx/effects'
import { AngularSvgIconModule } from 'angular-svg-icon'

import { reducers } from './app/store/store'
import { RootComponent } from './app/components/root/root.component'
import { MainComponent } from './app/components/pages/main/main.component'
import { CategoriesComponent } from './app/components/pages/categories/categories.component'
import { WalletsComponent } from './app/components/pages/wallets/wallets.component'
import { IncomesComponent } from './app/components/pages/incomes/incomes.component'
import { StatisticsComponent } from './app/components/pages/statistics/statistics.component'
import { ExpensesComponent } from './app/components/pages/expenses/expenses.component'
import { ROUTES_ENUM } from './app/constants/enums'

export const routes: Routes = [
  { path: ROUTES_ENUM.INDEX, component: MainComponent, data: { state: '1' } },
  {
    path: ROUTES_ENUM.EXPENSES,
    component: ExpensesComponent,
    data: { state: '2' }
  },
  { path: ROUTES_ENUM.INCOMES, component: IncomesComponent },
  { path: ROUTES_ENUM.CATEGORIES, component: CategoriesComponent },
  { path: ROUTES_ENUM.WALLETS, component: WalletsComponent },
  { path: ROUTES_ENUM.STATISTICS, component: StatisticsComponent }
]

bootstrapApplication(RootComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes),
      HttpClientModule,
      BrowserAnimationsModule,
      AngularSvgIconModule.forRoot()
    ),
    provideStore(reducers),
    provideStoreDevtools(),
    provideEffects()
  ]
}).catch(err => console.error(err))
