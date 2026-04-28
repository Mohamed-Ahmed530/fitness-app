import { Component } from '@angular/core';
import { ServiceBarComponent } from "../../../../shared/ui/service-bar/serviceBar.component";
import { AboutComponent } from "../../../about/components/about-component/about.component";

@Component({
  selector: 'app-home',
  imports: [ServiceBarComponent, AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
