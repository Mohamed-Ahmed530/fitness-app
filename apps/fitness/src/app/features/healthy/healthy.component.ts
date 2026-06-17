import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SectionNameComponent } from '../../shared/ui/section-name/sectionName.component';
import { ExploreCardComponent, IExploreCard } from '../../shared/components/ui/explore-card/explore-card.component';
import { MealsService, ICategory, IMeal } from './services/meals.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-healthy',
  standalone: true,
  imports: [SectionNameComponent, ExploreCardComponent, CommonModule],
  templateUrl: './healthy.component.html',
  styleUrl: './healthy.component.scss',
})
export class HealthyComponent implements OnInit {
  private readonly mealsService = inject(MealsService);

  categories = signal<ICategory[]>([]);
  meals = signal<IMeal[]>([]);
  activeCategory = signal<string>('Seafood');
  loading = signal<boolean>(false);

  // Pagination
  currentPage = signal<number>(1);
  pageSize = signal<number>(6);
  totalPages = computed(() => Math.ceil(this.meals().length / this.pageSize()));
  pageNumbers = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  displayCategories = ['Breakfast', 'Lunch', 'Dinner'];
  selectedTab = signal<string>('Dinner');

  ngOnInit(): void {
    this.loadMeals(this.selectedTab());
  }

  selectTab(tab: string): void {
    this.selectedTab.set(tab);
    this.currentPage.set(1); // Reset to first page
    this.loadMeals(tab);
  }

  setPage(page: number): void {
    this.currentPage.set(page);
  }

  private loadMeals(category: string): void {
    this.loading.set(true);
    this.mealsService.getMealsByCategory(category).subscribe({
      next: (res) => {
        this.meals.set(res.meals || []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  getExploreCards(): IExploreCard[] {
    const startIndex = (this.currentPage() - 1) * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    return this.meals().slice(startIndex, endIndex).map(meal => ({
      title: meal.strMeal.toUpperCase(),
      image: meal.strMealThumb,
      link: `/healthy/meal/${meal.idMeal}`,
      actionLabel: 'Explore'
    }));
  }
}
