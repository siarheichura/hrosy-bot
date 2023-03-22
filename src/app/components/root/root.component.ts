import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { Store } from '@ngrx/store'

import { HeaderComponent } from '@components/header/header.component'
import { HttpService } from '@services/http.service'
import { getWallets } from '@store/actions'
import { walletsSelector } from '@store/selectors'
import { IState } from '@store/store'
import { environment } from '../../../environments/environment'
import { ROUTES_ANIMATIONS } from '@constants/constants'

// @ts-ignore
const tg = window.Telegram.WebApp

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, HeaderComponent, RouterOutlet],
  animations: ROUTES_ANIMATIONS
})
export class RootComponent implements OnInit {
  wallets$ = this.store.select(walletsSelector)

  constructor(private httpService: HttpService, private store: Store<IState>) {}

  ngOnInit(): void {
    this.initTelegram()
    this.store.dispatch(getWallets())
  }

  getStateForAnimation(outlet: any) {
    return outlet.activatedRouteData.state
  }

  initTelegram() {
    console.log('TELEGRAM DATA LOG: ', tg)
    // create session
    tg.ready()
    tg.expand()

    if (environment.production) {
      this.httpService.setUserToLocalStorage(
        tg.initDataUnsafe.hash,
        tg.initDataUnsafe.user.id
      )
    } else {
      this.httpService.setUserToLocalStorage('dev_hash', 5958132991)
    }
  }
}
