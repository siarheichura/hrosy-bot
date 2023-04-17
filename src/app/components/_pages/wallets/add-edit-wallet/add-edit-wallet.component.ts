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
import { map, take, tap } from 'rxjs'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { IState } from '@store/store'
import { currenciesSelector, walletsSelector } from '@store/selectors'
import { getAllCurrencies } from '@store/actions'

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
    MatSlideToggleModule,
    MatDialogModule
  ]
})
export class AddEditWalletComponent implements OnInit {
  store: Store<IState> = inject(Store)
  fb = inject(FormBuilder)
  dialogRef = inject(MatDialogRef)
  dialogData: { title: string; id?: string } = inject(MAT_DIALOG_DATA)

  form: FormGroup<IWalletForm> = this.fb.group({
    name: ['', [Validators.required, Validators.min(1)]],
    currency: ['', [Validators.required]],
    isMain: [false, [Validators.required]]
  })

  currencies$ = this.store.select(currenciesSelector)
  wallet$ = this.store
    .select(walletsSelector)
    .pipe(
      take(1),
      map(wallets => wallets.find(w => w.id === this.dialogData.id)),
      tap(wallet => {
        if (this.dialogData.id && wallet) {
          this.form.patchValue({
            name: wallet.name,
            currency: wallet.currency,
            isMain: wallet.isMain
          })
        }
      })
    )
    .subscribe()

  ngOnInit() {
    this.store.dispatch(getAllCurrencies())
  }

  submitHandler() {
    if (this.form.valid) {
      this.dialogRef.close({
        ...this.form.value,
        id: this.dialogData.id
      })
    }
  }
}
