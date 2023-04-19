import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { Store } from '@ngrx/store'
import { IState } from '@store/store'
import { transfersSelector, walletsSelector } from '@store/selectors'
import { combineLatestWith, map } from 'rxjs'
import { CardComponent } from '@components/card/card.component'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { AddEditTransferComponent } from '@pages/transfers/add-edit-transfer/add-edit-transfer.component'
import {
  addTransfer,
  deleteTransfer,
  getTransfers,
  resetStore,
  setPageTitle,
  updateTransfer
} from '@store/actions'
import { DateRangePickerComponent } from '@components/date-range-picker/date-range-picker.component'
import { IPeriod } from '@app//interfaces'
import { INITIAL_MONTH_PERIOD } from '@constants/constants'
import { MatInputModule } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatDatepickerModule } from '@angular/material/datepicker'

@UntilDestroy()
@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    CardComponent,
    DateRangePickerComponent,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    ReactiveFormsModule
  ]
})
export class TransfersComponent implements OnInit, OnDestroy {
  store = inject(Store<IState>)
  dialog = inject(MatDialog)

  $transfers = this.getTransfers()

  constructor() {}

  ngOnInit() {
    this.store.dispatch(setPageTitle({ title: 'TRANSFERS' }))
    this.store.dispatch(getTransfers({ period: INITIAL_MONTH_PERIOD }))
  }

  getTransfers() {
    return this.store.select(walletsSelector).pipe(
      untilDestroyed(this),
      combineLatestWith(this.store.select(transfersSelector)),
      map(([wallets, transfers]) => {
        return transfers?.map(transfer => {
          const walletFrom = wallets?.find(w => w.id === transfer.from)
          const walletTo = wallets?.find(w => w.id === transfer.to)

          return {
            ...transfer,
            from: walletFrom?.name,
            to: walletTo?.name,
            sumFrom: `${transfer.sumFrom}${walletFrom?.currency}`,
            sumTo: `${transfer.sumTo}${walletTo?.currency}`
          }
        })
      })
    )
  }

  changePeriodHandler(period: IPeriod) {
    this.store.dispatch(getTransfers({ period }))
  }

  addTransferHandler() {
    this.openDialog({ title: 'Add transfer' })
  }

  editTransferHandler(id: string) {
    this.openDialog({ title: 'Edit transfer', id })
  }

  deleteTransferHandler(id: string) {
    this.store.dispatch(deleteTransfer({ id }))
  }

  openDialog(data: { title: string; id?: string }) {
    const dialogRef = this.dialog.open(AddEditTransferComponent, {
      data
    })

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe(data => {
        if (data) {
          if (data.id) {
            this.store.dispatch(updateTransfer({ transfer: data }))
          } else {
            this.store.dispatch(addTransfer({ transfer: data }))
          }
        }
      })
  }

  ngOnDestroy() {
    this.store.dispatch(resetStore())
  }
}
