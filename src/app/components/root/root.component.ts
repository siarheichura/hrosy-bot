import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { trigger, transition, useAnimation } from '@angular/animations'
import { moveFromRight, moveFromLeft } from 'ngx-router-animations'
import { HeaderComponent } from '../header/header.component'

// @ts-ignore
const tg = window.Telegram.WebApp

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent],
  animations: [
    trigger('moveFromRight', [
      transition('1 => 2', useAnimation(moveFromRight))
    ]),
    trigger('moveFromLeft', [transition('2 => 1', useAnimation(moveFromLeft))])
  ]
})
export class RootComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    tg.expand()
    console.log('TELEGRAM LOG: ', tg)
  }

  getState(outlet: any) {
    return outlet.activatedRouteData.state
  }
}
