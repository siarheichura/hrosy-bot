import { bootstrapApplication } from '@angular/platform-browser'
import { enableProdMode, importProvidersFrom } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { provideEffects } from '@ngrx/effects'
import { reducer } from './app/store/store'
import { Effects } from './app/store/effects'

import { RootComponent } from './app/components/root/root.component'
import { MainComponent } from './app/components/_pages/main/main.component'
import { CategoriesComponent } from './app/components/_pages/categories/categories.component'
import { WalletsComponent } from './app/components/_pages/wallets/wallets.component'
import { IncomesComponent } from './app/components/_pages/incomes/incomes.component'
import { StatisticsComponent } from './app/components/_pages/statistics/statistics.component'
import { ExpensesComponent } from './app/components/_pages/expenses/expenses.component'

import { AuthInterceptor } from './app/services/auth.interceptor'
import { environment } from './environments/environment'

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

if (environment.production) {
  enableProdMode()
}
console.log('ENV: ', environment)
bootstrapApplication(RootComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes),
      HttpClientModule,
      BrowserAnimationsModule
    ),
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: AuthInterceptor },
    provideStore(reducer),
    provideStoreDevtools(),
    provideEffects([Effects])
  ]
}).catch(err => console.error(err))
