import { bootstrapApplication } from '@angular/platform-browser'
import { enableProdMode, importProvidersFrom } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { provideEffects } from '@ngrx/effects'
import { reducer } from '@store/store'
import { Effects } from '@store/effects'
import { RootComponent } from '@components/root/root.component'
import { MainComponent } from '@pages/main/main.component'
import { CategoriesComponent } from '@pages/categories/categories.component'
import { WalletsComponent } from '@pages/wallets/wallets.component'
import { StatisticsComponent } from '@pages/statistics/statistics.component'
import { OperationsComponent } from '@pages/operations/operations.component'
import { AuthInterceptor } from '@services/auth.interceptor'
import { environment } from './environments/environment'
import { ROUTES_ENUM } from '@constants/enums'

export const routes: Routes = [
  {
    path: ROUTES_ENUM.INDEX,
    component: MainComponent,
    data: { state: 'index' }
  },
  {
    path: `${ROUTES_ENUM.OPERATIONS}/:type`,
    component: OperationsComponent,
    data: { state: ROUTES_ENUM.OPERATIONS }
  },
  {
    path: ROUTES_ENUM.CATEGORIES,
    component: CategoriesComponent,
    data: { state: ROUTES_ENUM.CATEGORIES }
  },
  {
    path: ROUTES_ENUM.WALLETS,
    component: WalletsComponent,
    data: { state: ROUTES_ENUM.WALLETS }
  },
  {
    path: ROUTES_ENUM.STATISTICS,
    component: StatisticsComponent,
    data: { state: ROUTES_ENUM.STATISTICS }
  }
]

if (environment.production) {
  enableProdMode()
}

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
