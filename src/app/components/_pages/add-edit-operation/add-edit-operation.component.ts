import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { CommonModule } from '@angular/common'
import { ActivatedRoute } from '@angular/router'

import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatButtonModule } from '@angular/material/button'

import { Dayjs } from 'dayjs'
import * as dayjs from 'dayjs'

import { Store } from '@ngrx/store'
import { map, Subscription } from 'rxjs'
import { IState } from '@store/store'
import {
  categoriesSelector,
  operationSelector,
  walletsSelector
} from '@store/selectors'
import {
  addOperation,
  deleteOperation,
  getCategories,
  getOperation,
  updateOperation
} from '@store/actions'
import { IOperation, OperationType } from '../../../interfaces'

enum FORM_CONTROLS {
  WALLET = 'wallet',
  CATEGORY = 'category',
  SUM = 'sum',
  COMMENT = 'comment',
  DATE = 'date'
}

@Component({
  selector: 'app-add-edit-operation',
  templateUrl: './add-edit-operation.component.html',
  styleUrls: ['./add-edit-operation.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ]
})
export class AddEditOperationComponent implements OnInit, OnDestroy {
  type: OperationType = this.route.snapshot.params.type
  operationId: string | undefined = this.route.snapshot.params.id
  pageTitle: string = this.operationId ? 'Edit operation' : 'Add operation'
  operationForm: FormGroup
  formControls = FORM_CONTROLS
  currDate: Dayjs = dayjs()
  currency: string

  $wallets = this.store.select(walletsSelector)
  walletsSubscription: Subscription
  $operation = this.store.select(operationSelector)
  operationSubscription: Subscription
  $categories = this.store
    .select(categoriesSelector)
    .pipe(map(categories => categories[this.type]))

  constructor(
    private store: Store<IState>,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.store.dispatch(getCategories())

    this.operationForm = this.fb.group({
      [this.formControls.WALLET]: ['', [Validators.required]],
      [this.formControls.CATEGORY]: ['', [Validators.required]],
      [this.formControls.SUM]: [
        '',
        [Validators.required, Validators.min(0.01)]
      ],
      [this.formControls.COMMENT]: [''],
      [this.formControls.DATE]: [this.currDate.toDate(), [Validators.required]]
    })

    if (this.operationId) {
      this.store.dispatch(getOperation({ id: this.operationId }))
      this.operationSubscription = this.$operation.subscribe(operation => {
        this.operationForm.patchValue({
          [this.formControls.WALLET]: operation?.wallet,
          [this.formControls.CATEGORY]: operation?.category,
          [this.formControls.SUM]: operation?.sum,
          [this.formControls.COMMENT]: operation?.comment,
          [this.formControls.DATE]: operation?.createdAt
        })
      })
    } else {
      this.walletsSubscription = this.$wallets.subscribe(wallets => {
        const mainWallet = wallets.find(w => w.isMain)
        this.operationForm.patchValue({
          [this.formControls.WALLET]: mainWallet?.id
        })
        this.currency = mainWallet?.currency
      })
    }
  }

  formConfirmHandler() {
    if (!this.operationForm.valid) {
      this.operationForm.markAllAsTouched()
    }

    if (this.operationForm.valid && this.operationForm.touched) {
      const { wallet, category, sum, comment, date } = this.operationForm.value
      const operationObj: IOperation = {
        id: this.operationId,
        wallet,
        type: this.type,
        category,
        sum,
        comment,
        currency: this.currency,
        createdAt: dayjs(date).toISOString()
      }

      if (this.operationId) {
        this.store.dispatch(updateOperation({ operation: operationObj }))
      } else {
        this.store.dispatch(addOperation({ operation: operationObj }))
      }
    }
  }

  deleteOperationHandler() {
    this.store.dispatch(deleteOperation({ id: this.operationId }))
  }

  walletChangeHandler(id: string) {
    this.walletsSubscription = this.$wallets.subscribe(wallets => {
      const wallet = wallets.find(w => w.id === id)
      this.currency = wallet.currency
    })
  }

  ngOnDestroy() {
    this.walletsSubscription?.unsubscribe()
    this.operationSubscription?.unsubscribe()
  }
}
