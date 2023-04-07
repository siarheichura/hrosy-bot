import {
  ChangeDetectionStrategy,
  Component,
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
import { debounceTime, map } from 'rxjs'
import { Store } from '@ngrx/store'
import * as dayjs from 'dayjs'
import * as utc from 'dayjs/plugin/utc'
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
import { getCategories, getOperations, resetStore } from '@store/actions'
import {
  categoriesSelector,
  operationsSelector,
  walletsSelector
} from '@store/selectors'
import { IState } from '@store/store'
import { OperationType, Sort } from '../../../interfaces'

dayjs.extend(utc)

interface IFiltersForm {
  wallets: FormControl<string[]>
  categories: FormControl<string[]>
  comment: FormControl<string>
}

interface IPeriodForm {
  start: FormControl<Date>
  end: FormControl<Date>
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
    MatIconModule
  ]
})
export class OperationsComponent implements OnInit, OnDestroy {
  type: OperationType = this.route.snapshot.params.type
  isFilterMenuExpanded: boolean = false
  sort: Sort = 1
  periodForm: FormGroup<IPeriodForm>
  filtersForm: FormGroup<IFiltersForm>
  operations$ = this.store.select(operationsSelector)
  wallets$ = this.store.select(walletsSelector)
  categories$ = this.store
    .select(categoriesSelector)
    .pipe(map(categories => categories[this.type]))

  constructor(
    private store: Store<IState>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.initPeriodForm()
    this.initFiltersForm()

    this.dispatchGetOperations()
    this.store.dispatch(getCategories())
  }

  initPeriodForm() {
    this.periodForm = this.fb.group({
      start: [dayjs().utc().startOf('month').toDate()],
      end: [dayjs().utc().endOf('month').toDate()]
    })

    this.periodForm.valueChanges
      .pipe(untilDestroyed(this), debounceTime(500))
      .subscribe(value => {
        if (value.start && value.end) {
          this.dispatchGetOperations()
        }
      })
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
    const { start, end } = this.periodForm.value

    this.store.dispatch(
      getOperations({
        options: {
          type: this.type,
          period: {
            start: dayjs(start),
            end: dayjs(end)
          },
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
    void this.router.navigate(['add'], { relativeTo: this.route })
  }

  operationClickHandler(id: string) {
    void this.router.navigate([`edit/${id}`], { relativeTo: this.route })
  }

  ngOnDestroy() {
    this.store.dispatch(resetStore())
  }
}
