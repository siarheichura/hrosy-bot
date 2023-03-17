import { ChangeDetectionStrategy, Component } from '@angular/core'
import * as categoriesMock from '../../../../assets/categories.json'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class CategoriesComponent {
  categories: { expense: string[]; income: string[] } = categoriesMock
}
