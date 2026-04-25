import { Component } from '@angular/core';

import { WhyUsComponent } from '../../../features/home/components/why-us/why-us.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [WhyUsComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
