import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CarouselComponent } from 'apps/fitness/src/app/shared/components/ui/carousel/carousel.component';
import { SectionNameComponent } from "apps/fitness/src/app/shared/ui/section-name/sectionName.component";
import { TabComponent } from "apps/fitness/src/app/shared/components/ui/tab/tab.component";
import { WorkoutService } from '../../services/workout/workout.service';
import { Subject, takeUntil} from 'rxjs';
import { Muscle, MuscleGroup} from '../../interfaces/workout';


// Define the Workout interface directly
export interface Workout {
  title: string;
  image: string;
  link: string;
}
@Component({
  selector: 'app-workouts',
  imports: [SectionNameComponent, CarouselComponent, TranslatePipe, TabComponent,TranslatePipe],
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.scss',
})
export class WorkoutsComponent implements OnInit,OnDestroy {
  private _workoutService = inject(WorkoutService);
  private destroy$ = new Subject<void>();
  musclesGroup =signal<MuscleGroup[]>([]);
  muscles =signal<Muscle[]>([]);


  activeTab = signal<string>('Abdominals');

  ngOnInit(): void {
    this.getAllMusclesGroups();
    this.getMuscles({"_id": "69d982ed85f6bfa972bf2218","name": "Abdominals"});
  }

  getAllMusclesGroups(): void {
    this._workoutService.getAllMusclesGroups().pipe(takeUntil(this.destroy$)).subscribe({
      next:(res)=>{
        this.musclesGroup.set(res.musclesGroup);
        
      }
    })
  }
  

  getMuscles(mG: MuscleGroup) {
    this.activeTab.set(mG.name);
    console.log('Selected Tab:', mG.name);
    this._workoutService.getAllMusclesByMuscleId(mG._id).pipe(takeUntil(this.destroy$)).subscribe({
      next:(res)=>{
        this.muscles.set(res.muscles)
        console.log(res.muscles);
        
      }
    })


  }

  scrollTabs(distance: number) {
  const container = document.getElementById('tabsContainer');
  if (container) {
    const isRtl = document.documentElement.dir === 'rtl' || document.body.classList.contains('rtl');
    const scrollAmount = isRtl ? -distance : distance;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}

  ngOnDestroy(): void {
   this.destroy$.next(); 
   this.destroy$.complete(); 
  }

}
