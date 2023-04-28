import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
import { MENU_BUTTONS } from '@constants/constants'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class MainComponent {
  router = inject(Router)
  route = inject(ActivatedRoute)

  navButtons = MENU_BUTTONS

  onClick(route: string) {
    void this.router.navigate([route], { relativeTo: this.route })
  }
}
