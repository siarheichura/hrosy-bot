import { ChangeDetectionStrategy, Component } from '@angular/core'
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
  navButtons = MENU_BUTTONS

  constructor(private router: Router, private route: ActivatedRoute) {}

  onClick(route: string): void {
    void this.router.navigate([route], { relativeTo: this.route })
  }
}
