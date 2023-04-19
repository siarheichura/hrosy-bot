import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog'
import { tap } from 'rxjs'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatOptionModule } from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { Store } from '@ngrx/store'
import { IState } from '@store/store'
import { categoriesSelector } from '@store/selectors'
import { OPERATION_TYPES } from '@constants/enums'
import { OperationType } from '@app/interfaces'

interface IForm {
  name: FormControl<string>
  type: FormControl<OperationType>
}

@UntilDestroy()
@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditCategoryComponent {
  fb = inject(FormBuilder)
  store: Store<IState> = inject(Store)
  dialogRef = inject(MatDialogRef)
  dialogData: { title: string; id?: string } = inject(MAT_DIALOG_DATA)

  form: FormGroup<IForm> = this.fb.group({
    name: new FormControl(null, [Validators.required]),
    type: new FormControl(null, [Validators.required])
  })

  types = OPERATION_TYPES

  categories$ = this.store
    .select(categoriesSelector)
    .pipe(
      untilDestroyed(this),
      tap(categories => {
        if (this.dialogData.id && categories) {
          const category = categories.find(c => c.id === this.dialogData.id)
          this.form.patchValue(category)
        }
      })
    )
    .subscribe()

  submitHandler() {
    if (this.form.valid) {
      this.dialogRef.close({
        ...this.form.value,
        id: this.dialogData.id
      })
    }
  }
}
