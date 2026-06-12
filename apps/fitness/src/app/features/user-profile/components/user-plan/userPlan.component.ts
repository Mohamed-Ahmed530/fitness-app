import { Component, input, output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from "apps/fitness/src/app/shared/components/ui/button/button.component";

@Component({
  selector: 'app-user-plan',
  imports: [ButtonComponent,FormsModule],
  templateUrl: './userPlan.component.html',
  styleUrl: './userPlan.component.scss',
})
export class UserPlanComponent {
  question = input.required<string>();
  answers = input.required<string[]>();
  checkedAnswer: string = '';
  saveAnswer=output<string>();
  

  onClick(){
    console.log('checkedAnswer:' ,this.checkedAnswer);
    this.saveAnswer.emit(this.checkedAnswer);
    
  }

}
