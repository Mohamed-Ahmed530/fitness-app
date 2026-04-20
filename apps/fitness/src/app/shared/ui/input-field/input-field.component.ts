import { Component, forwardRef, input, Optional, Self, signal } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-input-field',
  imports: [ReactiveFormsModule,IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
 
})
export class InputFieldComponent implements ControlValueAccessor {
  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  placeholder = input<string>('');
  type = input<string>('text');
  id = input<string>('');
  disabledFlag = input<boolean>(false);
  value = signal<any>('');
  disabled = signal<boolean>(false);
 

  onChange: (value: any) => void = () => { };
  onTouched: () => void = () => { };

  handleInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
    this.onChange(val);
  }

  writeValue(val: any): void {
    this.value.set(val);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
