import { Component, input, output, signal } from '@angular/core';
import { QuestionComponent } from "../question/question.component";
import { WheelPickerComponent } from "../wheel-picker/wheelPicker.component";
import { ButtonComponent } from "apps/fitness/src/app/shared/components/ui/button/button.component";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-body-metrics',
  imports: [QuestionComponent, WheelPickerComponent, ButtonComponent, TranslatePipe],
  templateUrl: './bodyMetrics.component.html',
  styleUrl: './bodyMetrics.component.scss',
})
export class BodyMetricsComponent {
  question = input.required<string>();
  trackedNumber = signal<number>(0);
  onClick = output<number>();


  yourTrackFunction(n: number) {
    this.trackedNumber.set(n)
    console.log('tracked number is ', this.trackedNumber());

  }

  save() {
    this.onClick.emit(this.trackedNumber())

  }

}
