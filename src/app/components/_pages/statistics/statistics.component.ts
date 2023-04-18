import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms'
import { debounceTime, tap } from 'rxjs'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import * as dayjs from 'dayjs'
import * as utc from 'dayjs/plugin/utc'
import { MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { Store } from '@ngrx/store'
import { IState } from '@store/store'
import { getStatistics, resetStore, setPageTitle } from '@store/actions'
import { statisticsSelector, walletsSelector } from '@store/selectors'
import { OPERATION_TYPES } from '@constants/enums'
import { OperationType } from '@app/interfaces'

dayjs.extend(utc)

interface IPeriodForm {
  start: FormControl<Date>
  end: FormControl<Date>
}

@UntilDestroy()
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatProgressBarModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsComponent implements OnInit, OnDestroy {
  types = OPERATION_TYPES
  periodForm: FormGroup<IPeriodForm>
  typeControl: FormControl<string> = new FormControl(this.types.EXPENSE)
  walletControl: FormControl<string> = new FormControl('')
  wallet: FormControl<string> = new FormControl('')
  statistics$ = this.store.select(statisticsSelector)
  wallets$ = this.store.select(walletsSelector).pipe(
    tap(wallets => {
      const mainWallet = wallets.find(w => w.isMain)
      this.walletControl.patchValue(mainWallet?.id, { emitEvent: false })
      this.dispatchGetStatistics()
    })
  )

  constructor(private store: Store<IState>, private fb: FormBuilder) {}

  ngOnInit() {
    this.store.dispatch(setPageTitle({ title: 'STATISTICS' }))

    this.periodForm = this.fb.group({
      start: [dayjs().utc().startOf('month').toDate()],
      end: [dayjs().utc().endOf('month').toDate()]
    })

    this.periodForm.valueChanges
      .pipe(untilDestroyed(this), debounceTime(500))
      .subscribe(value => {
        console.log('va', value)
        if (value.start && value.end) {
          this.dispatchGetStatistics()
        }
      })

    this.typeControl.valueChanges
      .pipe(untilDestroyed(this), debounceTime(500))
      .subscribe(() => {
        this.dispatchGetStatistics()
      })

    this.walletControl.valueChanges
      .pipe(untilDestroyed(this), debounceTime(500))
      .subscribe(() => {
        this.dispatchGetStatistics()
      })
  }

  dispatchGetStatistics() {
    const walletId = this.walletControl.value
    const type = this.typeControl.value as OperationType
    const { start, end } = this.periodForm.value

    if (walletId) {
      this.store.dispatch(
        getStatistics({
          options: {
            type,
            walletId,
            period: { start: dayjs(start), end: dayjs(end) }
          }
        })
      )
    }
  }

  ngOnDestroy() {
    this.store.dispatch(resetStore())
  }
}
