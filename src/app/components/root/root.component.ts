import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from '../header/header.component'

// @ts-ignore
const tg = window.Telegram.WebApp

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent]
})
export class RootComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    tg.expand()
    console.log('TELEGRAM LOG: ', tg)
  }
}
