import {bootstrapApplication} from "@angular/platform-browser";
import {RootComponent} from "./app/components/root/root.component";
import {importProvidersFrom} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {provideStore} from "@ngrx/store";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {provideEffects} from "@ngrx/effects";
import {reducers} from "./app/store/store";

export const routes: Routes = [];

bootstrapApplication(RootComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes),
    ),
    provideStore(reducers),
    provideStoreDevtools(),
    provideEffects(),
  ]
})
  .catch(err => console.error(err));
