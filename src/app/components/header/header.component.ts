import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core'
import { CommonModule, Location } from '@angular/common'
import { ActivatedRoute, NavigationStart, Router } from '@angular/router'
import { MatIconModule } from '@angular/material/icon'
import { Subject, Subscription } from 'rxjs'
import { walletsSelector } from '@store/selectors'
import { Store } from '@ngrx/store'
import { IState } from '@store/store'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule]
})
export class HeaderComponent implements OnInit, OnDestroy {
  wallets$ = this.store.select(walletsSelector)

  routeSubscription: Subscription
  backButtonVisible$: Subject<boolean> = new Subject()
  walletsVisible$: Subject<boolean> = new Subject()

  constructor(
    private store: Store<IState>,
    private location: Location,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.backButtonVisible$.next(event.url !== '/' && event.url[1] !== '#')
        this.walletsVisible$.next(!event.url.includes('wallets'))
      }
    })
  }

  backHandler() {
    void this.router.navigate([''])
    // this.location.back()
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe()
  }
}
