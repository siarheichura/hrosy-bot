import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router
} from '@angular/router'
import { tap } from 'rxjs'
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { Store } from '@ngrx/store'
import { IState } from '@store/store'
import { walletsSelector } from '@store/selectors'
import { MENU_BUTTONS } from '@constants/constants'
import { IWallet } from '@app/interfaces'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'

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
  route = inject(ActivatedRoute)

  menuItems = MENU_BUTTONS
  mainWallet: IWallet
  pageTitle: string

  wallets$ = this.store.select(walletsSelector).pipe(
    tap(wallets => {
      this.mainWallet = wallets?.find(w => w?.isMain)
    })
  )

  ngOnInit(): void {
    this.router.events.pipe(untilDestroyed(this)).subscribe(event => {
      if (event instanceof NavigationStart) {
        const routeName = event.url.replace('/', '')
        this.pageTitle = routeName.startsWith('#') ? 'Operations' : routeName
      }
    })
  }

  menuItemClickHandler(item: any) {
    void this.router.navigate([item.route])
  }
}
