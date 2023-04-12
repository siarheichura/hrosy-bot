import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output
} from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { debounceTime } from 'rxjs'
import { INITIAL_MONTH_PERIOD } from '@constants/constants'
import * as dayjs from 'dayjs'

interface IForm {
  start: FormControl<Date>
  end: FormControl<Date>
}

@UntilDestroy()
@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule
  ]
})
export class DateRangePickerComponent implements OnInit {
  fb = inject(FormBuilder)

  @Output() valueChanges = new EventEmitter()

  form: FormGroup<IForm>

  ngOnInit() {
    this.form = this.fb.group({
      start: [INITIAL_MONTH_PERIOD.start.toDate()],
      end: [INITIAL_MONTH_PERIOD.end.toDate()]
    })

    this.form.valueChanges
      .pipe(untilDestroyed(this), debounceTime(500))
      .subscribe(({ start, end }) => {
        if (start && end) {
          this.valueChanges.emit({
            start: dayjs(start),
            end: dayjs(end)
          })
        }
      })
  }
}
