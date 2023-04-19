import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-confirm-snack-bar',
  templateUrl: './confirm-snack-bar.component.html',
  styleUrls: ['./confirm-snack-bar.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatSnackBarModule, MatButtonModule]
})
export class ConfirmSnackBarComponent implements OnInit {
  snackBarRef = inject(MatSnackBarRef)
  message: string =
    this.snackBarRef.containerInstance.snackBarConfig.data.message

  ngOnInit() {}
}
