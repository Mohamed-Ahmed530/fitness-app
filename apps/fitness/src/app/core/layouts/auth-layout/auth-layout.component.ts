import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { AuthSidePanelComponent } from "./components/auth-side-panel/auth-side-panel.component";

@Component({
  selector: 'app-auth-layout',
  imports: [RouterModule, AuthSidePanelComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {}
