import { Component } from '@angular/core';
import { CarouselComponent } from 'apps/fitness/src/app/shared/components/ui/carousel/carousel.component';
import { SectionNameComponent } from "apps/fitness/src/app/shared/ui/section-name/sectionName.component";

@Component({
  selector: 'app-workouts',
  imports: [SectionNameComponent,CarouselComponent],
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.scss',
})
export class WorkoutsComponent {}
