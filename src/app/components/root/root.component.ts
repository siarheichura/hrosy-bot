import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { Store } from '@ngrx/store'
import { trigger, transition, useAnimation } from '@angular/animations'
import { moveFromRight, moveFromLeft } from 'ngx-router-animations'

import { HeaderComponent } from '../header/header.component'
import { HttpService } from '../../services/http.service'
import { getWallets } from '../../store/actions'
import { walletsSelector } from '../../store/selectors'
import { IState } from '../../store/store'

// @ts-ignore
const tg = window.Telegram.WebApp

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, HeaderComponent, RouterOutlet],
  animations: [
    trigger('moveFromRight', [
      transition('1 => 2', useAnimation(moveFromRight))
    ]),
    trigger('moveFromLeft', [transition('2 => 1', useAnimation(moveFromLeft))])
  ]
})
export class RootComponent implements OnInit {
  wallets$ = this.store.select(walletsSelector)

  constructor(private httpService: HttpService, private store: Store<IState>) {}

  ngOnInit(): void {
    this.initTelegram()

    // this.httpService.setHashToLocalStorage(tg.initDataUnsafe.hash) // for prod
    this.httpService.setHashToLocalStorage('dev_hash')

    this.store.dispatch(getWallets())
  }

  getStateForAnimation(outlet: any) {
    return outlet.activatedRouteData.state
  }

  initTelegram() {
    tg.ready()
    tg.expand()
    console.log('TELEGRAM DATA LOG: ', tg)
  }
}
