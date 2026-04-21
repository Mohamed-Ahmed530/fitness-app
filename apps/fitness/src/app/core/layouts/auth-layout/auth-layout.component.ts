import { Component, inject } from '@angular/core';
import { RouterModule } from "@angular/router";
import { AuthSidePanelComponent } from "./components/auth-side-panel/auth-side-panel.component";
import { ThemeService } from '../../../shared/services/theme-service/theme.service';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterModule, AuthSidePanelComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {

   readonly _themeService = inject(ThemeService);

  toggleTheme() {
  const current = localStorage.getItem('theme');
  if (current === 'dark') {
    this._themeService.setTheme('light');
  } else {
    this._themeService.setTheme('dark');
  }
}
}
