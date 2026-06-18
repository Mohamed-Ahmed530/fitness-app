import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, input, OnDestroy, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@fitness/auth-data-access';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { finalize, Subject, takeUntil, timer } from 'rxjs';
import { ErrorMessageComponent } from "apps/fitness/src/app/shared/components/ui/error-message/error-message.component";
import { ButtonComponent } from "apps/fitness/src/app/shared/components/ui/button/button.component";
import { ToastModule } from 'primeng/toast';
import { InputComponent } from "apps/fitness/src/app/shared/components/ui/input/input.component";
import { TranslationMyAppService } from 'apps/fitness/src/app/shared/services/TranslationMyApp/translation-my-app.service';
import { TranslatePipe } from '@ngx-translate/core';



@Component({
  selector: 'app-settings-card',
  imports: [DialogModule, ReactiveFormsModule, ErrorMessageComponent, ToastModule, InputComponent, ButtonComponent,FormsModule,TranslatePipe],
  providers: [MessageService],
  templateUrl: './settingsCard.component.html',
  styleUrl: './settingsCard.component.scss',
})
export class SettingsCardComponent implements OnDestroy {
  readonly _authService = inject(AuthService);
  private readonly cookieService = inject(CookieService);
  private readonly messageService = inject(MessageService);
  private readonly _translationMyAppService = inject(TranslationMyAppService);
  private destroy$ = new Subject<void>();
  private readonly _formBuilder = inject(FormBuilder);

  icon = input.required<string>();
  settingsType = input<string>();
  visible: boolean = false;
  changePassForm!: FormGroup;
  loading: WritableSignal<boolean> = signal(false);
  togglePassword: WritableSignal<boolean> = signal(false);
  langCurrent:'en'|'ar'='en';



  showDialog() {
    this.visible = true;
  }

  ngOnInit(): void {
    this.initForm();
    this.getLang();
  }

  initForm(): void {
    this.changePassForm = this._formBuilder.group({
      password: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      newPassword: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]]
    })
  }
  getLang(): void {
    const lang = localStorage.getItem('lang');
    if (lang === 'en' || lang === 'ar') {
      this.langCurrent = lang;
    } else {
      this.langCurrent = 'en';
    }
    
  }

  submitForm(): void {
    if (this.changePassForm.valid) {
      if (!this.loading()) {
        this.loading.set(true);
        this._authService.changePassword(this.changePassForm.value)
          .pipe(takeUntil(this.destroy$), finalize(() => this.loading.set(false))).subscribe({
            next: (res) => {
              if (res.message === "success") {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password changed successfully' });

                timer(2000).pipe(takeUntil(this.destroy$)).subscribe(() => {
                  this.cookieService.set('fitness-access-token', res.token);
                  this.changePassForm.reset();
                  this.visible = false;
                })

              }
            },
            error: (err: HttpErrorResponse) => {
              if (err.error.error) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.error });
              }
            }
          })
      }

    } else {
      this.changePassForm.markAllAsTouched();
    }
  }

  // toggle password
  togglePasswordVisibility(): void {
    this.togglePassword.update(prev => !prev);
  }

  logout() {
    this._authService.logout().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        console.log(res);
        this.cookieService.delete('fitness-access-token', '/');
        this._authService.isLoggedIn.set(false);
        window.location.reload(); // Refresh the page after successful logout

      },
      error: (err) => {
        console.error('Error when logging out:', err);
      }
    });

    this.visible = false; // Close the dialog after logging out
  }

  changeLang(){
    console.log(this.langCurrent);
    this._translationMyAppService.setLanguage(this.langCurrent);
    this.visible = false;
    
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }



}
