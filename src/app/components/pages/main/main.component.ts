import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MainButtonComponent } from '../../main-button/main-button.component'
import { CommonModule } from '@angular/common'
import { ROUTES_ENUM } from '../../../constants/enums'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MainButtonComponent]
})
export class MainComponent {
  menuButtons: { name: string; emoji: string; route: string }[] = [
    { name: 'Expenses', emoji: '⬆️', route: ROUTES_ENUM.EXPENSES },
    { name: 'Incomes', emoji: '⬇️', route: ROUTES_ENUM.INCOMES },
    { name: 'Categories', emoji: '🏷', route: ROUTES_ENUM.CATEGORIES },
    { name: 'Wallets', emoji: '👛', route: ROUTES_ENUM.WALLETS },
    { name: 'Statistics', emoji: '📈', route: ROUTES_ENUM.STATISTICS }
  ]

  constructor() {}
}
