import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { Store } from '@ngrx/store'

import { HeaderComponent } from '@components/header/header.component'
import { HttpService } from '@services/http.service'
import { getWallets } from '@store/actions'
import { IState } from '@store/store'
import { environment } from '../../../environments/environment'
import { ROUTES_ANIMATIONS } from '@constants/constants'

declare var Telegram: any
export const tg = Telegram.WebApp

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

  showAlert() {
    tg.showAlert('Hi alert')
  }

  showConfirm() {
    tg.showConfirm('Hi confirm')
  }
}
