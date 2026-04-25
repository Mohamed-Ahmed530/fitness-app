import { Component } from '@angular/core';
import { ButtonComponent } from "../../../../shared/components/ui/button/button.component";
import { LabelComponent } from "../../../../shared/components/ui/label/label.component";
import { InputComponent } from "../../../../shared/components/ui/input/input.component";
import { ErrorMessageComponent } from "../../../../shared/components/ui/error-message/error-message.component";

@Component({
  selector: 'app-register',
  imports: [ButtonComponent, LabelComponent, InputComponent, ErrorMessageComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {}
