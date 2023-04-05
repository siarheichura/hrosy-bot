import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { CommonModule } from '@angular/common'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { map, Subscription } from 'rxjs'
import { Store } from '@ngrx/store'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { IState } from '@store/store'
import { currenciesSelector, walletsSelector } from '@store/selectors'
import {
  addWallet,
  deleteWallet,
  getAllCurrencies,
  updateWallet
} from '@store/actions'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { SnackBarService } from '@services/snack-bar.service'

interface IWalletForm {
  name: FormControl<string>
  currency: FormControl<string>
  isMain: FormControl<boolean>
}

@Component({
  selector: 'app-add-edit-wallet',
  templateUrl: './add-edit-wallet.component.html',
  styleUrls: ['./add-edit-wallet.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule
  ]
})
export class AddEditWalletComponent implements OnInit, OnDestroy {
  walletId = this.route.snapshot.params.id
  walletsSubscription: Subscription
  walletForm: FormGroup<IWalletForm>

  currencies$ = this.store.select(currenciesSelector)
  wallet$ = this.store
    .select(walletsSelector)
    .pipe(map(wallets => wallets.find(wallet => wallet.id === this.walletId)))

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<IState>,
    private fb: FormBuilder,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.store.dispatch(getAllCurrencies())

    this.walletForm = this.fb.group({
      name: ['', [Validators.required, Validators.min(1)]],
      currency: ['', [Validators.required]],
      isMain: [false, [Validators.required]]
    })

    if (this.walletId) {
      this.patchFormValue()
    }
  }

  patchFormValue() {
    this.walletsSubscription = this.wallet$.subscribe(wallet => {
      this.walletForm.patchValue(
        {
          name: wallet?.name,
          currency: wallet?.currency,
          isMain: wallet?.isMain
        },
        { emitEvent: false }
      )
    })
  }

  formConfirmHandler() {
    if (this.walletForm.valid && this.walletForm.touched) {
      const { name, currency, isMain } = this.walletForm.value

      if (this.walletId) {
        // const data = { id: this.walletId, currency }

        this.store.dispatch(
          updateWallet({ data: { id: this.walletId, name, currency, isMain } })
        )
      } else {
        this.store.dispatch(addWallet({ data: { name, currency, isMain } }))
      }
    }
  }

  deleteWalletHandler() {
    const message =
      'Are you sure? All operations of this wallet will be deleted'
    this.snackBarService.printConfirmSnackBar(message, () =>
      this.store.dispatch(deleteWallet({ id: this.walletId }))
    )
  }

  ngOnDestroy() {
    this.walletsSubscription?.unsubscribe()
  }
}
