import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { LabelComponent } from '../../../../shared/components/ui/label/label.component';
import { InputComponent } from '../../../../shared/components/ui/input/input.component';
import { ErrorMessageComponent } from '../../../../shared/components/ui/error-message/error-message.component';
import { AuthHeaderComponent } from '../../../../shared/components/ui/auth-header/auth-header.component';
import { SocialAuthComponent } from '../../../../shared/components/ui/social-auth/social-auth.component';
import { AuthCardComponent } from '../../../../shared/components/ui/auth-card/auth-card.component';
import { AuthService } from '@fitness/auth-data-access';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    LabelComponent,
    InputComponent,
    ErrorMessageComponent,
    AuthHeaderComponent,
    SocialAuthComponent,
    AuthCardComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly cookieService = inject(CookieService);

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

  // initForm(): void{
  //   this.registerForm = this._formBuilder.group({
  //     firstName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  //     lastName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  //     email: [null, [Validators.required, Validators.email]],
  //     password: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
  //     rePassword: [null, [Validators.required]],
  //     gender: [null, [Validators.required]],
  //     height: [null, [Validators.required, Validators.min(1), Validators.max(250)]],
  //     weight: [null, [Validators.required, Validators.min(1), Validators.max(250)]],
  //     age: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
  //     goal: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  //     activityLevel: [null ,[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  //   });
  // }

    initForm(): void{
      this.registerForm = this._formBuilder.group({
        email: ["mohamed.ahmed.mmaa.530@gmail.com", [Validators.required, Validators.email]],
        password: ["Mohamed530$", [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      });
    }

  submitForm(): void{
    console.log(this.registerForm.value);

    this._authService.signin(this.registerForm.value).subscribe({
      next:(res) => {
        console.log(res);
        this._authService.isLoggedIn.set(true);
        this.cookieService.set('fitness-access-token', res.token);
        this._router.navigate(['/home'])
      },error:(err) => {
        console.log(err);        
      }
    })

  }

}