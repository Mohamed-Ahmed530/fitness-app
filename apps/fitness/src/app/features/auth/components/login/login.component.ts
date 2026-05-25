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

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, InputComponent, AuthHeaderComponent, SocialAuthComponent, ButtonComponent, ErrorMessageComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!:FormGroup;
  private readonly _authService = inject(AuthService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  private destroy$ = new Subject<void>();
  private readonly cookieService = inject(CookieService);


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

  submitForm():void{
    if (this.loginForm.valid) {
      // this.errorMsg.set("");
      if (!this.loading()) {
        this.loading.set(true);
        this._authService.signin(this.loginForm.value)
        .pipe(takeUntil(this.destroy$), finalize(()=> this.loading.set(false))).subscribe({
          next:(res)=>{
            if (res.message === "success") {
              timer(1000).pipe(takeUntil(this.destroy$)).subscribe(()=>{
                this.cookieService.set('fitness-access-token',res.token);
                this._router.navigate(['/home']);
              })
              // this.success.set(res.message);
            }
          },
          error:(err: HttpErrorResponse)=>{
            if (err.error.error) {
              // this.errorMsg.set(err.error.error);
            }
          }
        })
      }

    }else{
      this.loginForm.markAllAsTouched();
    }
  }

   // toggle password
  togglePasswordVisibility(): void {
    this.togglePassword.update(prev => !prev);
  }

  
}
