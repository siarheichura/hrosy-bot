import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ConfirmSnackBarComponent } from '@components/confirm-snack-bar/confirm-snack-bar.component'
import { take } from 'rxjs'

type TSnackBarType = 'error' | 'warn' | 'success'

const SNACK_BAR_TYPE_EMOJI = {
  error: '❗',
  warn: '⚠️',
  success: '✅'
}

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  printInfoSnackBar(type: TSnackBarType, message: string) {
    const messageWithEmoji = `${SNACK_BAR_TYPE_EMOJI[type]} ${message}`

    this.snackBar.open(messageWithEmoji, '❌', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 2000
    })
  }

  printConfirmSnackBar(message: string, onConfirm: () => void) {
    this.snackBar
      .openFromComponent(ConfirmSnackBarComponent, {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        data: { message }
      })
      .afterDismissed()
      .pipe(take(1))
      .subscribe(res => {
        if (res.dismissedByAction) {
          onConfirm()
        }
      })
  }
}
