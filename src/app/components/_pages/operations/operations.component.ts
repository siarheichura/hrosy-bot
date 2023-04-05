import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Dayjs } from 'dayjs'
import * as dayjs from 'dayjs'
import * as utc from 'dayjs/plugin/utc'
import { MatFormFieldModule } from '@angular/material/form-field'
import {
  MatDatepickerInputEvent,
  MatDatepickerModule
} from '@angular/material/datepicker'
import { MatDividerModule } from '@angular/material/divider'
import { MatNativeDateModule } from '@angular/material/core'
import { MatExpansionModule } from '@angular/material/expansion'
import { getOperations, resetStore } from '@store/actions'
import { operationsSelector } from '@store/selectors'
import { IState } from '@store/store'
import { OperationType } from '../../../interfaces'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { ButtonComponent } from '@components/button/button.component'
import { MatButtonModule } from '@angular/material/button'

dayjs.extend(utc)

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    ButtonComponent,
    MatButtonModule,
    MatIconModule
  ]
})
export class OperationsComponent implements OnInit, OnDestroy {
  operations$ = this.store.select(operationsSelector)
  type: OperationType = this.route.snapshot.params.type
  dateForm: FormGroup
  startDate: Dayjs = dayjs().utc().startOf('month')
  endDate: Dayjs = dayjs().utc().endOf('month')

  constructor(
    private store: Store<IState>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.dispatch(
      getOperations({
        options: {
          type: this.type,
          start: this.startDate,
          end: this.endDate
        }
      })
    )

    this.dateForm = this.fb.group({
      start: [this.startDate.toDate()],
      end: [this.endDate.toDate()]
    })
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    const { start, end } = this.dateForm.value

    if (start && end) {
      this.store.dispatch(
        getOperations({
          options: {
            type: this.type,
            start: dayjs(start).utc().startOf('day'),
            end: dayjs(end).utc().endOf('day')
          }
        })
      )
    }
  }

  addNewHandler() {
    void this.router.navigate(['add'], { relativeTo: this.route })
  }

  operationClickHandler(id: string) {
    void this.router.navigate([`edit/${id}`], { relativeTo: this.route })
  }

  ngOnDestroy() {
    this.store.dispatch(resetStore())
  }
}
