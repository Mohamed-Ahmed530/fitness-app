import { Component, computed, inject, OnInit, signal, DestroyRef } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SectionNameComponent } from '../../shared/ui/section-name/sectionName.component';
import { CarouselComponent } from '../../shared/components/ui/carousel/carousel.component';
import { MealsService, ICategory, IMeal } from './services/meals.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-healthy',
  standalone: true,
  imports: [SectionNameComponent, CommonModule, NgOptimizedImage, CarouselComponent],
  templateUrl: './healthy.component.html',
  styleUrl: './healthy.component.scss',
})
export class HealthyComponent implements OnInit {
  private readonly mealsService = inject(MealsService);
  private readonly destroyRef = inject(DestroyRef);

  categories = signal<ICategory[]>([]);
  meals = signal<IMeal[]>([]);
  activeCategory = signal<string>('Seafood');
  loading = signal<boolean>(false);

  totalPages = computed(() => Math.ceil(this.meals().length / 6));
  
  allExploreCards = computed(() => this.meals().map(meal => ({
    _id: meal.idMeal,
    name: meal.strMeal.toUpperCase(),
    image: meal.strMealThumb,
    link: `/healthy/meal/${meal.idMeal}`
  })));

  displayCategories = ['Breakfast', 'Lunch', 'Dinner'];
  selectedTab = signal<string>('Dinner');

  ngOnInit(): void {
    this.loadMeals(this.selectedTab());
  }

  selectTab(tab: string): void {
    this.selectedTab.set(tab);
    this.loadMeals(tab);
  }

  private loadMeals(category: string): void {
    this.loading.set(true);
    this.mealsService.getMealsByCategory(category).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.meals.set(res.meals||[]);
        console.log(res);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
}
