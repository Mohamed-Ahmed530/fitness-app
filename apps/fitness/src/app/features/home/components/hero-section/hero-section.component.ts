import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { ActionButtonComponent } from "../../../../shared/components/ui/action-button/action-button.component";

@Component({
  selector: 'app-hero-section',
  imports: [NgOptimizedImage, ActionButtonComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent {}
