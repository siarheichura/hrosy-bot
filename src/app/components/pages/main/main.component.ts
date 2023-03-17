import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MainButtonComponent } from '../../main-button/main-button.component'
import { NgForOf } from '@angular/common'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MainButtonComponent, NgForOf]
})
export class MainComponent {
  menuButtons: { name: string; emoji: string }[] = [
    { name: 'Expenses', emoji: '👛' },
    { name: 'Incomes', emoji: '👛' },
    { name: 'Categories', emoji: '👛' },
    { name: 'Wallets', emoji: '👛' },
    { name: 'Statistics', emoji: '👛' }
  ]

  constructor() {}
}
