import { Component } from '@angular/core';
import { HeroSectionComponent } from "./components/hero-section/hero-section.component";
import { ServiceBarComponent } from "../../shared/ui/service-bar/serviceBar.component";
import { AboutComponent } from "../about/components/about-component/about.component";
import { WhyUsComponent } from "./components/why-us/why-us.component";

@Component({
  selector: 'app-home',
  imports: [HeroSectionComponent, ServiceBarComponent, AboutComponent, WhyUsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
