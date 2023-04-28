import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  inject
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { map, tap } from 'rxjs'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { Store } from '@ngrx/store'
import { IState } from '@store/store'
import { getStatistics, resetStore, setPageTitle } from '@store/actions'
import { statisticsSelector, walletsSelector } from '@store/selectors'
import { DateRangePickerComponent } from '@components/date-range-picker/date-range-picker.component'
import { IPeriod, IWallet, OperationType } from '@app/interfaces'
import { INITIAL_MONTH_PERIOD } from '@constants/constants'

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    DateRangePickerComponent
  ]
})
export class StatisticsComponent implements OnInit, OnDestroy {
  store: Store<IState> = inject(Store)

  type: OperationType = 'expense'
  wallet: IWallet
  period: IPeriod = INITIAL_MONTH_PERIOD

  statistics$ = this.store.select(statisticsSelector).pipe(
    map(stats => ({
      report: stats,
      total: stats?.reduce((prev, curr) => prev + curr.sum, 0)
    }))
  )
  wallets$ = this.store.select(walletsSelector).pipe(
    tap(wallets => {
      this.wallet = wallets?.find(w => w.isMain)

      if (this.wallet) {
        this.dispatchGetStatistics()
      }
    })
  )

  ngOnInit() {
    this.store.dispatch(setPageTitle({ title: 'STATISTICS' }))
  }

  changePeriodHandler(period: IPeriod) {
    this.period = period
    this.dispatchGetStatistics()
  }

  walletsMenuItemClickHandler(wallet: IWallet) {
    if (wallet.id !== this.wallet.id) {
      this.wallet = wallet
      this.dispatchGetStatistics()
    }
  }

  typesMenuItemClickHandler(type: OperationType) {
    if (type !== this.type) {
      this.type = type
      this.dispatchGetStatistics()
    }
  }

  dispatchGetStatistics() {
    this.store.dispatch(
      getStatistics({
        options: {
          type: this.type,
          walletId: this.wallet.id,
          period: this.period
        }
      })
    )
  }

  ngOnDestroy() {
    this.store.dispatch(resetStore())
  }
}
