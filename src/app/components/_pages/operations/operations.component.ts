import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms'
import { debounceTime, map, take } from 'rxjs'
import { Store } from '@ngrx/store'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDividerModule } from '@angular/material/divider'
import { MatNativeDateModule } from '@angular/material/core'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import {
  addOperation,
  deleteOperation,
  getCategories,
  getOperation,
  getOperations,
  resetStore,
  setPageTitle,
  updateOperation
} from '@store/actions'
import {
  categoriesSelector,
  operationsSelector,
  walletsSelector
} from '@store/selectors'
import { IState } from '@store/store'
import { IPeriod, OperationType, Sort } from '@app/interfaces'
import { DateRangePickerComponent } from '@components/date-range-picker/date-range-picker.component'
import { CardComponent } from '@components/card/card.component'
import { INITIAL_MONTH_PERIOD } from '@constants/constants'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { AddEditOperationComponent } from '@pages/operations/add-edit-operation/add-edit-operation.component'

interface IFiltersForm {
  wallets: FormControl<string[]>
  categories: FormControl<string[]>
  comment: FormControl<string>
}

@UntilDestroy()
@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss'],
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
    MatButtonModule,
    MatIconModule,
    DateRangePickerComponent,
    CardComponent,
    MatDialogModule
  ]
})
export class OperationsComponent implements OnInit, OnDestroy {
  store: Store<IState> = inject(Store)
  fb = inject(FormBuilder)
  route = inject(ActivatedRoute)
  router = inject(Router)
  dialog = inject(MatDialog)

  type: OperationType = this.route.snapshot.params.type
  isFilterMenuExpanded: boolean = false
  sort: Sort = 1
  filtersForm: FormGroup<IFiltersForm>

  operations$ = this.store.select(operationsSelector)
  wallets$ = this.store.select(walletsSelector)
  categories$ = this.store
    .select(categoriesSelector)
    .pipe(map(categories => categories[this.type]))

  ngOnInit() {
    this.store.dispatch(setPageTitle({ title: this.type.toUpperCase() }))
    this.initFiltersForm()
    this.dispatchGetOperations()
  }

  openAddEditDialog(title: string, id?: string) {
    this.store.dispatch(getCategories())
    if (id) {
      this.store.dispatch(getOperation({ id }))
    }
    const data = { title, type: this.type, id }

    this.dialog
      .open(AddEditOperationComponent, { data })
      .afterClosed()
      .pipe(take(1))
      .subscribe(data => {
        if (data) {
          this.store.dispatch(
            data.id
              ? updateOperation({ operation: data })
              : addOperation({ operation: data })
          )
        }
      })
  }

  changePeriodHandler(period: IPeriod) {
    this.store.dispatch(
      getOperations({
        options: {
          type: this.type,
          period,
          filters: { sort: this.sort, ...this.filtersForm.value }
        }
      })
    )
  }

  initFiltersForm() {
    this.filtersForm = this.fb.group({
      wallets: [],
      categories: [],
      comment: []
    })

    this.filtersForm.valueChanges
      .pipe(untilDestroyed(this), debounceTime(500))
      .subscribe(() => this.dispatchGetOperations())
  }

  dispatchGetOperations() {
    this.store.dispatch(
      getOperations({
        options: {
          type: this.type,
          period: INITIAL_MONTH_PERIOD,
          filters: { sort: this.sort, ...this.filtersForm.value }
        }
      })
    )
  }

  sortClickHandler() {
    this.sort = this.sort === 1 ? -1 : 1
    this.dispatchGetOperations()
  }

  addNewHandler() {
    this.openAddEditDialog('Add operation')
  }

  editOperationHandler(id: string) {
    this.openAddEditDialog('Edit operation', id)
  }

  deleteOperationHandler(id: string) {
    this.store.dispatch(deleteOperation({ id }))
  }

  ngOnDestroy() {
    this.store.dispatch(resetStore())
  }
}
