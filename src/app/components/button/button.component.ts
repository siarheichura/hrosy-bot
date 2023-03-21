import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class ButtonComponent {
  @Input() name: string
  @Output() buttonClick = new EventEmitter()

  buttonClickHandler(): void {
    this.buttonClick.emit()
  }
}
