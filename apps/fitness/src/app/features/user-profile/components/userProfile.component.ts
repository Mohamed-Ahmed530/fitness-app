import { Component } from '@angular/core';
import { ButtonComponent } from "../../../shared/components/ui/button/button.component";

@Component({
  selector: 'app-user-profile',
  imports: [ButtonComponent],
  templateUrl: './userProfile.component.html',
  styleUrl: './userProfile.component.scss',
})
export class UserProfileComponent {}
