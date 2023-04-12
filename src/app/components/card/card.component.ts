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
import { animate, state, style, transition, trigger } from '@angular/animations'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  animations: [
    trigger('translate', [
      state(
        'open',
        style({
          transform: 'translate(0)'
        })
      ),
      state(
        'closed',
        style({
          transform: 'translate(-100px)'
        })
      ),
      transition('open => closed', [animate('0.1s')]),
      transition('closed => open', [animate('0.1s')])
    ])
  ]
})
export class CardComponent implements OnInit {
  @Output() edit = new EventEmitter()
  @Output() delete = new EventEmitter()
  @Input() id: string
  translated = false

  constructor() {}

  ngOnInit() {}

  translate() {
    this.translated = !this.translated
  }

  editBtnHandler(event: MouseEvent, id: string) {
    event.stopPropagation()
    this.edit.emit(id)
    this.translate()
  }

  deleteBtnHandler(event: MouseEvent, id: string) {
    event.stopPropagation()
    this.delete.emit(id)
    this.translate()
  }
}
