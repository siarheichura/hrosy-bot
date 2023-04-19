import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { combineLatestWith } from 'rxjs'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog'
import { MatOptionModule } from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { LetModule } from '@ngrx/component'
import { Store } from '@ngrx/store'
import { IState } from '@store/store'
import { transfersSelector, walletsSelector } from '@store/selectors'

interface IForm {
  from: FormControl<string>
  to: FormControl<string>
  sumFrom: FormControl<number>
  sumTo: FormControl<number>
  rate: FormControl<number>
}

@UntilDestroy()
@Component({
  selector: 'app-add-edit-transfer',
  templateUrl: './add-edit-transfer.component.html',
  styleUrls: ['./add-edit-transfer.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LetModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule
  ]
})
export class AddEditTransferComponent implements OnInit {
  dialogRef = inject(MatDialogRef)
  dialogData: { title: string; id?: string } = inject(MAT_DIALOG_DATA)
  store = inject(Store<IState>)
  fb = inject(FormBuilder)

  wallets$ = this.store.select(walletsSelector)
  transfers$ = this.store.select(transfersSelector)
  currencyFrom: string
  currencyTo: string

  form: FormGroup<IForm> = this.fb.group({
    from: new FormControl(null, [Validators.required]),
    to: new FormControl(null, [Validators.required]),
    sumFrom: new FormControl(null, [Validators.required, Validators.min(0.01)]),
    sumTo: new FormControl(null, [Validators.required, Validators.min(0.01)]),
    rate: new FormControl(null)
  })

  ngOnInit() {
    this.patchFromValue()

    this.form.valueChanges
      .pipe(untilDestroyed(this), combineLatestWith(this.wallets$))
      .subscribe(([value, wallets]) => {
        this.currencyFrom = wallets.find(w => w?.id === value.from)?.currency
        this.currencyTo = wallets.find(w => w?.id === value.to)?.currency
      })
  }

  patchFromValue() {
    if (this.dialogData.id) {
      this.transfers$.pipe(untilDestroyed(this)).subscribe(transfers => {
        const transfer = transfers.find(t => t.id === this.dialogData.id)
        this.form.patchValue({ ...transfer })
      })
    } else {
      this.wallets$.pipe(untilDestroyed(this)).subscribe(wallets => {
        const mainWallet = wallets?.find(w => w.isMain)
        const secondaryWallet = wallets?.find(w => !w.isMain)

        this.form.patchValue({
          from: mainWallet.id,
          to: secondaryWallet.id
        })

        this.currencyFrom = mainWallet.currency
        this.currencyTo = secondaryWallet.currency
      })
    }
  }

  reverseWallets() {
    this.form.patchValue({
      from: this.form.controls.to.value,
      to: this.form.controls.from.value
    })
  }

  submitHandler() {
    if (this.form.valid) {
      const value = {
        ...this.form.value,
        id: this.dialogData.id,
        rate: (this.form.value.sumFrom / this.form.value.sumTo).toFixed(2)
      }
      this.dialogRef.close(value)
    }
  }
}
