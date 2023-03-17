import { bootstrapApplication } from '@angular/platform-browser'
import { importProvidersFrom } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { provideEffects } from '@ngrx/effects'
import { AngularSvgIconModule } from 'angular-svg-icon'

import { reducers } from './app/store/store'
import { RootComponent } from './app/components/root/root.component'
import { MainComponent } from './app/components/pages/main/main.component'

export const routes: Routes = [{ path: '', component: MainComponent }]

bootstrapApplication(RootComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes),
      AngularSvgIconModule.forRoot(),
      HttpClientModule
    ),
    provideStore(reducers),
    provideStoreDevtools(),
    provideEffects()
  ]
}).catch(err => console.error(err))
