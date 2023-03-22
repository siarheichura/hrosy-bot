import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MainButtonComponent } from '@components/main-button/main-button.component'
import { CommonModule } from '@angular/common'
import { MENU_BUTTONS } from '@constants/constants'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MainButtonComponent]
})
export class MainComponent {
  menuButtons = MENU_BUTTONS

  constructor() {}
}
