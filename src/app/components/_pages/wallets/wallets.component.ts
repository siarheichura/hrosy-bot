import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { Store } from '@ngrx/store'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { IState } from '@store/store'
import { walletsSelector } from '@store/selectors'

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class WalletsComponent implements OnInit {
  wallets$ = this.store.select(walletsSelector)

  constructor(
    private fb: FormBuilder,
    private store: Store<IState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  addWalletClickHandler() {
    void this.router.navigate(['add'], { relativeTo: this.route })
  }

  editWalletHandler(id: string) {
    void this.router.navigate([`edit/${id}`], { relativeTo: this.route })
  }
}
