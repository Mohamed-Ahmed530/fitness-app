import { Component } from '@angular/core';

@Component({
  selector: 'app-service-bar',
  imports: [],
  templateUrl: './serviceBar.component.html',
  styleUrl: './serviceBar.component.scss',
})
export class ServiceBarComponent {
    items = [
  'outdoor & online trainers',
  'personal training',
  'live classes',
];
}
