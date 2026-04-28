import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-name',
  imports: [],
  templateUrl: './sectionName.component.html',
  styleUrl: './sectionName.component.scss',
})
export class SectionNameComponent {
  sectionName= input.required<string>();
  sectionTitle= input.required<string>();
  centerAlignment= input.required<boolean>();
}
