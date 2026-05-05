import { Component } from '@angular/core';
import { NavigationBarComponent } from "../../core/components/navigation-bar/navigation-bar.component";
import { ServiceBarComponent } from "../../shared/ui/service-bar/serviceBar.component";
import { AboutComponent } from "../about/components/about-component/about.component";

@Component({
  selector: 'app-home',
  imports: [NavigationBarComponent, ServiceBarComponent, AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
