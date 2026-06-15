import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from 'apps/fitness/src/app/shared/components/ui/input/input.component';
import { finalize, Subject, takeUntil, timer } from 'rxjs';
import { AuthHeaderComponent } from "apps/fitness/src/app/shared/components/ui/auth-header/auth-header.component";
import { SocialAuthComponent } from "apps/fitness/src/app/shared/components/ui/social-auth/social-auth.component";
import { ButtonComponent } from "apps/fitness/src/app/shared/components/ui/button/button.component";
import { ErrorMessageComponent } from "apps/fitness/src/app/shared/components/ui/error-message/error-message.component";
import { AuthService } from '@fitness/auth-data-access';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, InputComponent, AuthHeaderComponent, SocialAuthComponent, ButtonComponent, ErrorMessageComponent, ButtonModule, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent {
  loginForm!: FormGroup;
  private readonly _authService = inject(AuthService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  private destroy$ = new Subject<void>();
  private readonly cookieService = inject(CookieService);
  private readonly messageService = inject(MessageService);


  togglePassword: WritableSignal<boolean> = signal(false);
  loading: WritableSignal<boolean> = signal(false);

  loginViaSocial(provider: string) {
    const socialUrls: Record<string, string> = {
      google: 'https://www.google.com',
      facebook: 'https://www.facebook.com',
      apple: 'https://www.apple.com',
    };

    const url = socialUrls[provider];
    if (url) {
      window.open(url, '_blank');
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]]
    })
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      if (!this.loading()) {
        this.loading.set(true);
        this._authService.signin(this.loginForm.value)
          .pipe(takeUntil(this.destroy$), finalize(() => this.loading.set(false))).subscribe({
            next: (res) => {
              if (res.message === "success") {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Navigate to home...' });

                timer(2000).pipe(takeUntil(this.destroy$)).subscribe(() => {
                  this.cookieService.set('fitness-access-token', res.token);
                  this._authService.isLoggedIn.set(true);

                  this._router.navigate(['/home']);
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
      this.loginForm.markAllAsTouched();
    }
  }

  // toggle password
  togglePasswordVisibility(): void {
    this.togglePassword.update(prev => !prev);
  }




}
