import { Component, inject, input, OnDestroy, output } from '@angular/core';
import { ThemeService } from 'apps/fitness/src/app/shared/services/theme-service/theme.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { UserPlanComponent } from "../user-plan/userPlan.component";
import { AuthService } from '@fitness/auth-data-access';
import { Subject, takeUntil } from 'rxjs';
import { WheelPickerComponent } from '../wheel-picker/wheelPicker.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-card',
  imports: [ButtonModule, DialogModule, InputTextModule, UserPlanComponent,TranslatePipe, WheelPickerComponent],
  templateUrl: './profileCard.component.html',
  styleUrl: './profileCard.component.scss',
})
export class ProfileCardComponent implements OnDestroy {
  readonly _themeService = inject(ThemeService);
  readonly _authService = inject(AuthService);

  private destroy$ = new Subject<void>();

  cardTitle = input<string>();
  userInfoResponse = input<number | string>();
  visible: boolean = false;
  questionAnswered = output();

  showDialog() {
    this.visible = true;
  }

  updateAnswer(answer: string) {
    if (this.cardTitle() === 'your goal') {
      this._authService.editProfile({ goal: answer }).pipe(takeUntil(this.destroy$)).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error('Error updating goal:', err);
        }
      });
    } else if (this.cardTitle() === 'level') {
      const activityMap: Record<string, string> = {
        'rookie': 'level1',
        'beginner': 'level2',
        'intermediate': 'level3',
        'advanced': 'level4',
        'beast': 'level5'
      };

      this._authService.editProfile({ activityLevel: activityMap[answer] }).pipe(takeUntil(this.destroy$)).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error('Error updating activity level:', err);
        }
      });

    }
    this.visible = false;  // to close the dialog

    this.questionAnswered.emit(); // to notify parent component to refresh the data
  }
  userWeight: number = 70; 
  userHeight: number = 165;
  userAge: number = 25;

  onWeightChange(weight: number) {
    this.userWeight = weight;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
