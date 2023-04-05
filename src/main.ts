import { bootstrapApplication } from '@angular/platform-browser'
import { enableProdMode, importProvidersFrom } from '@angular/core'
import { provideRouter } from '@angular/router'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { provideEffects } from '@ngrx/effects'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { reducer } from '@store/store'
import { Effects } from '@store/effects'
import { RootComponent } from '@components/root/root.component'
import { AuthInterceptor } from '@services/auth.interceptor'
import { environment } from './environments/environment'
import { routes } from './routes'

if (environment.production) {
  enableProdMode()
}

bootstrapApplication(RootComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule,
      MatSnackBarModule
    ),
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: AuthInterceptor },
    provideStore(reducer),
    provideStoreDevtools(),
    provideEffects([Effects])
  ]
}).catch(err => console.error(err))
