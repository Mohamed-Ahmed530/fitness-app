import { Component } from '@angular/core';
import { ServiceBarComponent } from "../../../shared/ui/service-bar/serviceBar.component";

@Component({
  selector: 'app-home',
  imports: [ServiceBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
