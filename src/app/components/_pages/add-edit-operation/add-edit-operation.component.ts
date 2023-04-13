import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { CommonModule } from '@angular/common'
import { combineLatestWith, map, tap } from 'rxjs'

import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatButtonModule } from '@angular/material/button'
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog'

import * as dayjs from 'dayjs'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'

import { Store } from '@ngrx/store'
import { IState } from '@store/store'
import {
  categoriesSelector,
  operationSelector,
  walletsSelector
} from '@store/selectors'

import { OperationType } from '@app/interfaces'

interface IForm {
  wallet: FormControl<string>
  category: FormControl<string>
  sum: FormControl<number>
  comment: FormControl<string>
  date: FormControl<Date>
}

@UntilDestroy()
@Component({
  selector: 'app-add-edit-operation',
  templateUrl: './add-edit-operation.component.html',
  styleUrls: ['./add-edit-operation.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class AddEditOperationComponent implements OnInit {
  // injections
  store: Store<IState> = inject(Store)
  fb = inject(FormBuilder)
  dialogRef = inject(MatDialogRef)
  dialogData: { title: string; type: OperationType; id?: string } =
    inject(MAT_DIALOG_DATA)

  // properties
  currency: string

  // forms
  form: FormGroup<IForm> = this.fb.group({
    wallet: ['', [Validators.required]],
    category: ['', [Validators.required]],
    sum: [0, [Validators.required, Validators.min(0.01)]],
    comment: [''],
    date: [dayjs().toDate(), [Validators.required]]
  })

  // streams
  $wallets = this.store.select(walletsSelector).pipe(
    tap(wallets => {
      if (!this.dialogData.id) {
        this.form.patchValue({ wallet: wallets.find(w => w.isMain)?.id })
      }
    })
  )
  $operation = this.store
    .select(operationSelector)
    .pipe(
      untilDestroyed(this),
      tap(operation => {
        if (this.dialogData.id) {
          this.form.patchValue({
            wallet: operation?.wallet,
            category: operation?.category,
            sum: operation?.sum,
            comment: operation?.comment,
            date: operation?.createdAt
          })
        }
      })
    )
    .subscribe()
  $categories = this.store
    .select(categoriesSelector)
    .pipe(map(categories => categories[this.dialogData.type]))

  ngOnInit() {
    this.initWalletChangeHandler()
  }

  initWalletChangeHandler() {
    this.form.controls.wallet.valueChanges
      .pipe(untilDestroyed(this), combineLatestWith(this.$wallets))
      .subscribe(([value, wallets]) => {
        this.currency = wallets.find(w => w.id === value)?.currency
      })
  }

  submitHandler() {
    if (this.form.valid) {
      this.dialogRef.close({
        ...this.form.value,
        id: this.dialogData.id,
        type: this.dialogData.type,
        currency: this.currency
      })
    }
  }
}
