import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { LabelComponent } from '../../../../shared/components/ui/label/label.component';
import { InputComponent } from '../../../../shared/components/ui/input/input.component';
import { ErrorMessageComponent } from '../../../../shared/components/ui/error-message/error-message.component';
import { AuthHeaderComponent } from '../../../../shared/components/ui/auth-header/auth-header.component';
import { SocialAuthComponent } from '../../../../shared/components/ui/social-auth/social-auth.component';
import { AuthCardComponent } from "../../../../shared/components/ui/auth-card/auth-card.component";

@Component({
  selector: 'app-register',
  imports: [
    ButtonComponent,
    LabelComponent,
    InputComponent,
    ErrorMessageComponent,
    AuthHeaderComponent,
    SocialAuthComponent,
    AuthCardComponent
],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
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
}