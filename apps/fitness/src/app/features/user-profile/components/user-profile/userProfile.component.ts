import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ThemeService } from '../../../../shared/services/theme-service/theme.service';
import { ProfileCardComponent } from "../profile-card/profileCard.component";
import { SettingsCardComponent } from "../settings-card/settingsCard.component";
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { AuthService } from '@fitness/auth-data-access';
import { Subject, takeUntil } from 'rxjs';
import { ProfileModel } from 'libs/auth/data-access/src/lib/interfaces/profile.model';

@Component({
  selector: 'app-user-profile',
  imports: [ProfileCardComponent, SettingsCardComponent, ToggleSwitchModule, FormsModule],
  templateUrl: './userProfile.component.html',
  styleUrl: './userProfile.component.scss',
})
export class UserProfileComponent implements OnInit, OnDestroy {
  checked: boolean = false;
  readonly _themeService = inject(ThemeService);
  readonly _authService = inject(AuthService);
  currentMode = signal<string>('light');
  private destroy$ = new Subject<void>();
  userProfileData = signal<ProfileModel>({} as ProfileModel);
  activityLevel = signal<string>('');



  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this._authService.getProfileData().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        this.userProfileData.set(res);
        console.log(res);

        // to transform level1, level2, level3, level4, level5 to readable format
        const activityMap: Record<string, string> = {
          'level1': 'rookie',
          'level2': 'beginner',
          'level3': 'intermediate',
          'level4': 'advanced',
          'level5': 'true beast'
        };

        const currentLevel = this.userProfileData().activityLevel;

        if (activityMap[currentLevel]) {
          this.activityLevel.set(activityMap[currentLevel]);
        }


      },
      error: (err) => {
        console.error('Error fetching user info:', err);
      }
    });



  }

  toggleTheme() {
    const current = localStorage.getItem('theme');
    if (current === 'dark') {
      this._themeService.setTheme('light');
      this.checked = false;
      this.currentMode.set('light');
    } else {
      this._themeService.setTheme('dark');
      this.checked = true;
      this.currentMode.set('dark');

    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
