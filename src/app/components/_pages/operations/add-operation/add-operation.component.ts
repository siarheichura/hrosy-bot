import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatDividerModule } from '@angular/material/divider'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-add-operation',
  templateUrl: './add-operation.component.html',
  styleUrls: ['./add-operation.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    AddOperationComponent,
    MatButtonModule
  ]
})
export class AddOperationComponent implements OnInit {
  form: FormGroup

  wallets: { id: string; name: string; currency: string; isMain: boolean }[] = [
    { id: '0', name: 'MainWallet', currency: 'GEL', isMain: true },
    { id: '1', name: 'Stash', currency: 'EUR', isMain: false },
    { id: '2', name: 'SecondaryWallet', currency: 'EUR', isMain: false }
  ]
  walletFrom = this.wallets.find(w => w.isMain)
  walletTo = this.wallets.find(w => !w.isMain)

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      walletFrom: [this.walletFrom.id],
      walletTo: [this.walletTo.id],
      rateFrom: [1],
      rateTo: [1],
      sumFrom: [1],
      sumTo: [1]
    })
  }

  get currencySuffixFrom() {
    const wallet = this.wallets.find(
      w => w.id === this.form.get('walletFrom').value
    )
    return wallet.currency
  }

  get currencySuffixTo() {
    const wallet = this.wallets.find(
      w => w.id === this.form.get('walletTo').value
    )
    return wallet.currency
  }

  sumFromInputHandler() {
    const formValue = this.form.value
    const sumFrom = formValue.sumFrom
    const rateFrom = formValue.rateFrom

    this.form.get('sumTo').setValue(sumFrom / rateFrom)
  }

  sumToInputHandler() {
    const formValue = this.form.value
    const sumTo = formValue.sumTo
    const rateTo = formValue.rateTo

    this.form.get('sumFrom').setValue(sumTo * rateTo)
  }

  calculator(formControlName: string) {
    this.form.valueChanges.subscribe(value => {
      this.form.patchValue({
        rateFrom: value.rateTo === 1 ? value.rateFrom : 1,
        rateTo: value.rateFrom === 1 ? value.rateTo : 1
      })
    })
  }
}
