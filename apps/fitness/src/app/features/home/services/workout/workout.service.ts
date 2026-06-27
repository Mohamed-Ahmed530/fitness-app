import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MuscleById, Muscles, RondomMuscles } from './../../interfaces/workout';
import { environment } from 'apps/fitness/src/app/core/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private _httpClient = inject(HttpClient);


  getAllMusclesGroups(): Observable<Muscles> {
    return this._httpClient.get<Muscles>(`${environment.baseUrl}muscles`);
  }
  getAllMusclesByMuscleId(id:string): Observable<MuscleById> {
    return this._httpClient.get<MuscleById>(`${environment.baseUrl}musclesGroup/${id}`);
  }
  getRondomMuscles(): Observable<RondomMuscles> {
    return this._httpClient.get<RondomMuscles>(`${environment.baseUrl}muscles/random`);
  }

}
