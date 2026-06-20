import { Component, input, output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from "apps/fitness/src/app/shared/components/ui/button/button.component";
import { QuestionComponent } from "../question/question.component";

@Component({
  selector: 'app-user-plan',
  imports: [ButtonComponent, FormsModule, TranslatePipe, QuestionComponent],
  templateUrl: './userPlan.component.html',
  styleUrl: './userPlan.component.scss',
})
export class UserPlanComponent {
  question = input.required<string>();
  answers = input.required<string[]>();
  
  checkedAnswer: string = ''; 
  saveAnswer = output<string>();

  onClick() {
    console.log('checkedAnswer to API:', this.checkedAnswer);
    this.saveAnswer.emit(this.checkedAnswer);
  }
}