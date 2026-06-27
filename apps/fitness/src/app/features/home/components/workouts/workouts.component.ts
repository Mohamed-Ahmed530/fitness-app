import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CarouselComponent } from 'apps/fitness/src/app/shared/components/ui/carousel/carousel.component';
import { SectionNameComponent } from "apps/fitness/src/app/shared/ui/section-name/sectionName.component";
import { TabComponent } from "apps/fitness/src/app/shared/components/ui/tab/tab.component";
import { WorkoutService } from '../../services/workout/workout.service';
import { Subject, takeUntil } from 'rxjs';
import { Muscle, MuscleGroup } from '../../interfaces/workout';
import { CarouselModule } from 'primeng/carousel';
import { SkeletonModule } from 'primeng/skeleton';


// Define the Workout interface directly
export interface Workout {
  title: string;
  image: string;
  link: string;
}
@Component({
  selector: 'app-workouts',
  imports: [SectionNameComponent, CarouselComponent, TranslatePipe, TabComponent, TranslatePipe, CarouselModule, SkeletonModule],
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.scss',
})
export class WorkoutsComponent implements OnInit, OnDestroy {
  private _workoutService = inject(WorkoutService);
  private destroy$ = new Subject<void>();
  musclesGroup = signal<MuscleGroup[]>([]);
  muscles = signal<Muscle[]>([]);
  isLoading = signal<boolean>(true);
  skeletonArray = new Array(3);



  activeTab = signal<string>('full body');
  responsiveOptions: any[] | undefined;
  responsiveOptionsSkeleton: any[] | undefined;

  ngOnInit(): void {
    this.getAllMusclesGroups();
    this.getFullBodyWorkout();
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 4,
        numScroll: 1
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
      }
    ];
    this.responsiveOptionsSkeleton = [
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '1199px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  getAllMusclesGroups(): void {
    this._workoutService.getAllMusclesGroups().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        this.musclesGroup.set(res.musclesGroup);

      }
    })
  }


  getMuscles(mG: MuscleGroup) {
    this.activeTab.set(mG.name);
    this.isLoading.set(true);
    console.log('Selected Tab:', mG.name);
    this._workoutService.getAllMusclesByMuscleId(mG._id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        setTimeout(() => {
          this.isLoading.set(false);
          this.muscles.set(res.muscles)

        }, 2000)
        console.log(res.muscles);

      }
    })


  }

  getFullBodyWorkout() {
    this.activeTab.set('full body');
    this.isLoading.set(true);
    this._workoutService.getRondomMuscles().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        setTimeout(() => {
          this.isLoading.set(false);
          this.muscles.set(res.muscles)

        }, 2000)
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
