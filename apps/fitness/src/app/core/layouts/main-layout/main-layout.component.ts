import { Component } from '@angular/core';
import { FooterComponent } from '../../../features/home/components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NavigationBarComponent } from '../../components/navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [FooterComponent, RouterModule, NavigationBarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
