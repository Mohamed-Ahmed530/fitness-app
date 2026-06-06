import { Component, signal } from '@angular/core';
import { CarouselComponent } from 'apps/fitness/src/app/shared/components/ui/carousel/carousel.component';
import { SectionNameComponent } from "apps/fitness/src/app/shared/ui/section-name/sectionName.component";

// Define the Workout interface directly
export interface Workout {
    title: string;
    image: string;
    link: string; 
}
@Component({
  selector: 'app-workouts',
  imports: [SectionNameComponent,CarouselComponent],
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.scss',
})
export class WorkoutsComponent {
  // Initialize inline mock data matching the interface
    workouts = signal<Workout[]>([
        {  title: 'Group workout', image: '/images/w1.png', link: '' },
        {  title: 'personal training', image: '/images/w2.png', link: '' },
        {  title: 'muscle bilding', image: '/images/w3.png', link: '' },
        {  title: 'Group workout', image: '/images/w1.png', link: '' },
        {  title: 'personal training', image: '/images/w2.png', link: '' },
        {  title: 'muscle bilding', image: '/images/w3.png', link: '' }
    ]);

}
