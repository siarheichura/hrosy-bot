import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { AngularSvgIconModule } from 'angular-svg-icon'

@Component({
  selector: 'app-main-button',
  templateUrl: './main-button.component.html',
  styleUrls: ['./main-button.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AngularSvgIconModule]
})
export class MainButtonComponent {
  @Input() data: { name: string; emoji: string }
}
