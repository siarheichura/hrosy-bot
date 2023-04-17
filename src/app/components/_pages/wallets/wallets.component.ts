import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { take } from 'rxjs'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { IState } from '@store/store'
import { walletsSelector } from '@store/selectors'
import { addWallet, deleteWallet, updateWallet } from '@store/actions'
import { AddEditWalletComponent } from '@pages/wallets/add-edit-wallet/add-edit-wallet.component'
import { CardComponent } from '@components/card/card.component'
import { SnackBarService } from '@services/snack-bar.service'

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    CardComponent
  ]
})
export class WalletsComponent implements OnInit {
  store: Store<IState> = inject(Store)
  router = inject(Router)
  dialog = inject(MatDialog)
  snackBarService = inject(SnackBarService)

  wallets$ = this.store.select(walletsSelector)

  ngOnInit(): void {}

  openAddEditDialog(title: string, id?: string) {
    const data = { title, id }

    this.dialog
      .open(AddEditWalletComponent, { data })
      .afterClosed()
      .pipe(take(1))
      .subscribe(data => {
        if (data) {
          this.store.dispatch(
            data.id ? updateWallet({ data }) : addWallet({ data })
          )
        }
      })
  }

  addWalletClickHandler() {
    this.openAddEditDialog('Add wallet')
  }

  editWalletHandler(id: string) {
    this.openAddEditDialog('Edit wallet', id)
  }

  deleteWalletHandler(id: string) {
    this.snackBarService.printConfirmSnackBar(
      'Are you sure? All operations will be deleted!',
      () => this.store.dispatch(deleteWallet({ id }))
    )
  }
}
