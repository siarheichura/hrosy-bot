import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core'
import { CommonModule, Location } from '@angular/common'
import { ActivatedRoute, NavigationStart, Router } from '@angular/router'
import { MatIconModule } from '@angular/material/icon'
import { Subject, Subscription } from 'rxjs'
import { IWallets } from '../../interfaces'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule]
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() wallets: IWallets

  routeSubscription: Subscription
  backButtonVisible$: Subject<boolean> = new Subject()

  routeTest$: Subject<string> = new Subject<string>()

  constructor(
    private location: Location,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log('Nav start event log: ', event)
        this.routeTest$.next(event.url)
        this.backButtonVisible$.next(event.url !== '/')
      }
    })
  }

  backHandler() {
    this.location.back()
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe()
  }
}
