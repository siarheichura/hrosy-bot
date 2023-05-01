import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from '@components/header/header.component'
import { HttpService } from '@services/http.service'
import { Store } from '@ngrx/store'
import { IState } from '@store/store'
import { getWallets } from '@store/actions'
import { environment } from '../../../environments/environment'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { loadingSelector } from '@store/selectors'

declare var Telegram: any

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    HeaderComponent,
    RouterOutlet,
    MatProgressSpinnerModule
  ]
})
export class RootComponent implements OnInit {
  tg = Telegram.WebApp

  httpService = inject(HttpService)
  store = inject(Store<IState>)

  loading$ = this.store.select(loadingSelector)

  ngOnInit(): void {
    this.initTelegram()
    this.store.dispatch(getWallets())
  }

  initTelegram() {
    console.log('TELEGRAM DATA LOG: ', this.tg)
    this.tg.ready()
    this.tg.expand()

    if (environment.production) {
      this.httpService.setUserToLocalStorage(
        this.tg.initDataUnsafe.hash,
        this.tg.initDataUnsafe.user.id
      )
    } else {
      this.httpService.setUserToLocalStorage('dev_hash', 5958132991)
    }
  }
}
