import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-service-bar',
  imports: [TranslatePipe],
  templateUrl: './serviceBar.component.html',
  styleUrl: './serviceBar.component.scss',
})
export class ServiceBarComponent {
items = [
    'home.serviceBar.outdoorTrainers',
    'home.serviceBar.personalTraining',
    'home.serviceBar.liveClasses',
  ];
}
