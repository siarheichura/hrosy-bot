import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-main-button',
  templateUrl: './main-button.component.html',
  styleUrls: ['./main-button.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class MainButtonComponent {
  @Input() data: { name: string; emoji: string; route: string }

  constructor(private router: Router, private route: ActivatedRoute) {}

  onClick(route: string): void {
    void this.router.navigate([route], { relativeTo: this.route })
  }
}
