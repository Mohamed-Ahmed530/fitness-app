import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ICategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface IMeal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://www.themealdb.com/api/json/v1/1';

  getCategories(): Observable<{ categories: ICategory[] }> {
    return this.http.get<{ categories: ICategory[] }>(`${this.baseUrl}/categories.php`);
  }

  getMealsByCategory(category: string): Observable<{ meals: IMeal[] }> {
    return this.http.get<{ meals: IMeal[] }>(`${this.baseUrl}/filter.php?c=${category}`);
  }

  getMealById(id: string): Observable<{ meals: unknown[] }> {
    return this.http.get<{ meals: unknown[] }>(`${this.baseUrl}/lookup.php?i=${id}`);
  }
}
