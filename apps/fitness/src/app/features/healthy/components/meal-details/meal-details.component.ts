import { Component, inject, OnInit, signal, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CarouselModule } from 'primeng/carousel';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MealsService, IMeal } from '../../services/meals.service';
import { CommonModule } from '@angular/common';

export interface IMealDetail extends IMeal {
  strInstructions: string;
  [key: string]: string | undefined; 
}

@Component({
  selector: 'app-meal-details',
  standalone: true,
  imports: [CommonModule, RouterLink, CarouselModule],
  templateUrl: './meal-details.component.html',
  styleUrl: './meal-details.component.scss',
})
export class MealDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly mealsService = inject(MealsService);
  private readonly destroyRef = inject(DestroyRef);

  meal = signal<IMealDetail | null>(null);
  sidebarMeals = signal<IMeal[]>([]);
  loading = signal<boolean>(false);
  
  displayCategories = ['Breakfast', 'Lunch', 'Dinner'];
  selectedTab = signal<string>('Dinner');

  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadMealDetails(id);
      }
    });

    this.loadSidebarMeals(this.selectedTab());
  }

  loadMealDetails(id: string): void {
    this.loading.set(true);
    this.mealsService.getMealById(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.meals && res.meals.length > 0) {
          this.meal.set(res.meals[0] as IMealDetail);
        }
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  loadSidebarMeals(category: string): void {
    this.mealsService.getMealsByCategory(category).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.sidebarMeals.set((res.meals || []).slice(0, 5)); // Just take first 5 for sidebar
      }
    });
  }

  selectTab(tab: string): void {
    this.selectedTab.set(tab);
    this.loadSidebarMeals(tab);
  }

  getIngredients(): { name: string, measure: string }[] {
    const ingredients: { name: string, measure: string }[] = [];
    const meal = this.meal();
    if (!meal) return [];

    for (let i = 1; i <= 20; i++) {
      const name = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (name && name.trim()) {
        ingredients.push({ name, measure: measure || '' });
      }
    }
    return ingredients;
  }
}
