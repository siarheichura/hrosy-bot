import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import {
  bounceInOnEnterAnimation,
  bounceOutOnLeaveAnimation
} from 'angular-animations'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  animations: [bounceInOnEnterAnimation(), bounceOutOnLeaveAnimation()]
})
export class CardComponent implements OnInit {
  @Output() edit = new EventEmitter<string>()
  @Output() delete = new EventEmitter<string>()
  @Input() id: string

  actionsVisible = false

  toggleActions() {
    this.actionsVisible = !this.actionsVisible
  }

  constructor() {}

  ngOnInit() {}

  editBtnHandler(event: MouseEvent, id: string) {
    event.stopPropagation()
    this.edit.emit(id)
    this.toggleActions()
  }

  deleteBtnHandler(event: MouseEvent, id: string) {
    event.stopPropagation()
    this.delete.emit(id)
    this.toggleActions()
  }
}
