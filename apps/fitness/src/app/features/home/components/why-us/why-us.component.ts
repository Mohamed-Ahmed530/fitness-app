import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.scss',
})
export class WhyUsComponent {
  features = [
    {
      id: '01',
      title: 'Personalized Fitness Plans',
      description: 'We tailor every workout to fit your unique goals and fitness level ensuring that you make the most progress.'
    },
    {
      id: '02',
      title: 'Results-Driven Focus',
      description: 'Everything we do is designed to help you achieve measurable results, whether you\'re aiming for weight loss.'
    },
    {
      id: '03',
      title: 'State-Of-The-Art Equipment',
      description: 'We provide the latest in gym equipment, from cardio machines to free weights, designed to support every type.'
    }
  ];
}
