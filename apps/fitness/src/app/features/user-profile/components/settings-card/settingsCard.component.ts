import { Component, input } from '@angular/core';

@Component({
  selector: 'app-settings-card',
  imports: [],
  templateUrl: './settingsCard.component.html',
  styleUrl: './settingsCard.component.scss',
})
export class SettingsCardComponent {
  icon=input<string>();
}
