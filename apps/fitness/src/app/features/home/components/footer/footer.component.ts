import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  marqueeItems = [
    'CLASSES', 'OUTDOOR & ONLINE TRAINERS', 'PERSONAL TRAINING',
    'LIVE CLASSES', 'PERSONAL TRAINERS', 'CLASSES', 'OUTDOOR & ONLINE TRAINERS',
    'PERSONAL TRAINING', 'LIVE CLASSES', 'PERSONAL TRAINERS',
  ];
}
