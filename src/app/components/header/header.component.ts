import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { IWallets } from '../../interfaces'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class HeaderComponent implements OnInit {
  @Input() wallets: IWallets

  constructor() {}

  ngOnInit(): void {}
}
