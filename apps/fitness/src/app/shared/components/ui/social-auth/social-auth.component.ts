import { Component, output } from '@angular/core';

@Component({
  selector: 'app-social-auth',
  imports: [],
  templateUrl: './social-auth.component.html',
  styleUrl: './social-auth.component.scss',
})
export class SocialAuthComponent {
  selectProvider = output<string>();

  handleSocialClick(provider: string) {
    this.selectProvider.emit(provider);
  }
}
