import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

// @ts-ignore
const tg = window.Telegram.WebApp

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class RootComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    tg.ready()
    console.log('TELEGRAM LOG: ', tg)
  }
}
