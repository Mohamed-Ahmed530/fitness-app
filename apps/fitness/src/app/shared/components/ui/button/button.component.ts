import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  label = input<string>('');
  loading = input<boolean>(false);
  disabled = input<boolean>(false);
  parentForm = input<FormGroup>();
  styleClass = input<string>('');
  icon = input<string>('');
  iconPos = input<'left' | 'right'>('left');
  type = input<'button' | 'submit' | 'reset'>('button');
}