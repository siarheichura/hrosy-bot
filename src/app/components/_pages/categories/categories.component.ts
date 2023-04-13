import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { Store } from '@ngrx/store'
import { map } from 'rxjs'
import { LetModule } from '@ngrx/component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips'
import { MatIconModule } from '@angular/material/icon'
import { ReactiveFormsModule } from '@angular/forms'
import { IState } from '@store/store'
import { getCategories, resetStore, updateCategories } from '@store/actions'
import { categoriesSelector } from '@store/selectors'
import { ButtonComponent } from '@components/button/button.component'
import { ICategories } from '@app/interfaces'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    ReactiveFormsModule,
    ButtonComponent,
    LetModule
  ]
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories$ = this.store.select(categoriesSelector)

  constructor(private store: Store<IState>) {}

  ngOnInit(): void {
    this.store.dispatch(getCategories())
  }

  // refactor: use one method for both expense and income categories
  removeExpenseCategory(index: number): void {
    this.categories$ = this.categories$.pipe(
      map(categories => {
        return {
          ...categories,
          expense: categories.expense.filter((category, i) => i !== index)
        }
      })
    )
  }

  addExpenseCategory(event: MatChipInputEvent): void {
    const value = (event.value || '').trim()

    if (value) {
      this.categories$ = this.categories$.pipe(
        map(categories => ({
          ...categories,
          expense: [...categories.expense, value]
        }))
      )
    }

    event.chipInput!.clear()
  }

  removeIncomeCategory(index: number): void {
    this.categories$ = this.categories$.pipe(
      map(categories => {
        return {
          ...categories,
          income: categories.income.filter((category, i) => i !== index)
        }
      })
    )
  }

  addIncomeCategory(event: MatChipInputEvent): void {
    const value = (event.value || '').trim()

    if (value) {
      this.categories$ = this.categories$.pipe(
        map(categories => ({
          ...categories,
          income: [...categories.income, value]
        }))
      )
    }

    event.chipInput!.clear()
  }

  saveHandler(categories: ICategories): void {
    this.store.dispatch(updateCategories({ categories }))
  }

  ngOnDestroy() {
    this.store.dispatch(resetStore())
  }
}
