import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { map, take } from 'rxjs'
import { LetModule } from '@ngrx/component'
import { MatIconModule } from '@angular/material/icon'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { Store } from '@ngrx/store'
import { IState } from '@store/store'
import { categoriesSelector } from '@store/selectors'
import {
  addCategory,
  deleteCategory,
  getCategories,
  resetStore,
  updateCategory
} from '@store/actions'
import { CardComponent } from '@components/card/card.component'
import { AddEditCategoryComponent } from '@pages/categories/add-edit-category/add-edit-category.component'
import { OPERATION_TYPES } from '@constants/enums'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LetModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    CardComponent
  ]
})
export class CategoriesComponent implements OnInit, OnDestroy {
  store: Store<IState> = inject(Store)
  dialog = inject(MatDialog)

  categories$ = this.store.select(categoriesSelector).pipe(
    map(categories => ({
      expense: categories.filter(c => c.type === OPERATION_TYPES.EXPENSE),
      income: categories.filter(c => c.type === OPERATION_TYPES.INCOME)
    }))
  )

  ngOnInit(): void {
    this.store.dispatch(getCategories())
  }

  openAddEditDialog(title: string, id?: string) {
    const data = { title, id }

    this.dialog
      .open(AddEditCategoryComponent, { data })
      .afterClosed()
      .pipe(take(1))
      .subscribe(data => {
        if (data) {
          this.store.dispatch(
            data.id
              ? updateCategory({ category: data })
              : addCategory({ category: data })
          )
        }
      })
  }

  addCategoryHandler() {
    this.openAddEditDialog('Add category')
  }

  editCategoryHandler(id: string) {
    this.openAddEditDialog('Edit category', id)
  }

  deleteCategoryHandler(id: string) {
    this.store.dispatch(deleteCategory({ id }))
  }

  ngOnDestroy() {
    this.store.dispatch(resetStore())
  }
}
