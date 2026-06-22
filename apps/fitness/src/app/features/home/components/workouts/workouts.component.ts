import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CarouselComponent } from 'apps/fitness/src/app/shared/components/ui/carousel/carousel.component';
import { SectionNameComponent } from "apps/fitness/src/app/shared/ui/section-name/sectionName.component";
import { TabComponent } from "apps/fitness/src/app/shared/components/ui/tab/tab.component";

// Define the Workout interface directly
export interface Workout {
    title: string;
    image: string;
    link: string; 
}
@Component({
  selector: 'app-workouts',
  imports: [SectionNameComponent, CarouselComponent, TranslatePipe, TabComponent],
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.scss',
})
export class WorkoutsComponent {

  tabs:string[]=['full body','chest','arm','shoulder','back','legs','stomach'];

  activeTab = signal<string>('full body');

  // Initialize inline mock data matching the interface
    workouts = signal<Workout[]>([
        {  title: 'Group workout', image: '/images/w1.png', link: '' },
        {  title: 'personal training', image: '/images/w2.png', link: '' },
        {  title: 'muscle bilding', image: '/images/w3.png', link: '' },
        {  title: 'Group workout', image: '/images/w1.png', link: '' },
        {  title: 'personal training', image: '/images/w2.png', link: '' },
        {  title: 'muscle bilding', image: '/images/w3.png', link: '' }
    ]);

    clickk(tabValue:string){
      this.activeTab.set(tabValue);
      console.log('Selected Tab:', tabValue);
      
    }

}
