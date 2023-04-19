import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { NavigationStart, Router } from '@angular/router'
import { Subject } from 'rxjs'
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { Store } from '@ngrx/store'
import { IState } from '@store/store'
import { pageTitleSelector, walletsSelector } from '@store/selectors'

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule, MatMenuModule, MatButtonModule]
})
export class HeaderComponent implements OnInit {
  store: Store<IState> = inject(Store)
  router = inject(Router)

  wallets$ = this.store.select(walletsSelector)
  title$ = this.store.select(pageTitleSelector)

  backButtonVisible$: Subject<boolean> = new Subject()

  ngOnInit(): void {
    this.router.events.pipe(untilDestroyed(this)).subscribe(event => {
      if (event instanceof NavigationStart) {
        this.backButtonVisible$.next(event.url !== '/')
      }
    })
  }

  backHandler() {
    void this.router.navigate([''])
  }
}
