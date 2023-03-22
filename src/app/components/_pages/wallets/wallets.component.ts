import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { skip } from 'rxjs'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatSelectModule } from '@angular/material/select'
import { Store } from '@ngrx/store'
import { currenciesSelector, walletsSelector } from '@store/selectors'
import { getAllCurrencies } from '@store/actions'
import { IState } from '@store/store'
import { ButtonComponent } from '../../button/button.component'
import { IWallets } from '../../../interfaces'

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class WalletsComponent implements OnInit {
  currencies$ = this.store.select(currenciesSelector)
  wallets$ = this.store.select(walletsSelector).pipe(skip(1))
  wallets: IWallets

  form: FormGroup

  constructor(private fb: FormBuilder, private store: Store<IState>) {}

  ngOnInit(): void {
    this.store.dispatch(getAllCurrencies())
    this.initForm()
  }

  initForm(): void {
    this.form = this.fb.group({
      walletCurrency: [''],
      stashCurrency: ['']
    })
    this.wallets$.subscribe(wallets => (this.wallets = wallets))
  }

  saveHandler(): void {
    const data = {
      wallet: {
        ...this.wallets.wallet,
        currency: this.form.value.walletCurrency
      },
      stash: { ...this.wallets.stash, currency: this.form.value.walletCurrency }
    }
  }
}
