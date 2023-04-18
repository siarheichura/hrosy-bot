import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { NavigationStart, Router } from '@angular/router'
import { MatIconModule } from '@angular/material/icon'
import { Subject, Subscription } from 'rxjs'
import { pageTitleSelector, walletsSelector } from '@store/selectors'
import { Store } from '@ngrx/store'
import { IState } from '@store/store'
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule, MatMenuModule, MatButtonModule]
})
export class HeaderComponent implements OnInit, OnDestroy {
  store: Store<IState> = inject(Store)
  router = inject(Router)

  wallets$ = this.store.select(walletsSelector)
  title$ = this.store.select(pageTitleSelector)

  routeSubscription: Subscription
  backButtonVisible$: Subject<boolean> = new Subject()

  ngOnInit(): void {
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.backButtonVisible$.next(event.url !== '/')
      }
    })
  }

  backHandler() {
    void this.router.navigate([''])
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe()
  }
}
