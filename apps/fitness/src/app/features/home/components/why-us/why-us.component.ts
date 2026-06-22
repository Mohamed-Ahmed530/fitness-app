import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [CommonModule , TranslatePipe],
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.scss',
})
export class WhyUsComponent {
 features = [
  {
    id: 1,
    title: 'home.whyUsSection.features.feature1.title',
    description: 'home.whyUsSection.features.feature1.description'
  },
  {
    id: 2,
    title: 'home.whyUsSection.features.feature2.title',
    description: 'home.whyUsSection.features.feature2.description'
  },
  {
    id: 3,
    title: 'home.whyUsSection.features.feature3.title',
    description: 'home.whyUsSection.features.feature3.description'
  }
];
}
