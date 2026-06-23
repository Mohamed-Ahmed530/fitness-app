import { Route } from '@angular/router';
import { authGuard } from './core/guards/auth/auth-guard';

export const appRoutes: Route[] = [
    {
        path: '', loadComponent: () => import('./core/layouts/main-layout/main-layout.component').then((c) => c.MainLayoutComponent), children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadComponent: () => import('./features/home/home.component').then((c) => c.HomeComponent), title: 'Home' },
            { path: 'healthy', canActivate: [authGuard], loadComponent: () => import('./features/healthy/healthy.component').then((c) => c.HealthyComponent), title: 'Healthy' },
            { path: 'healthy/meal/:id', canActivate: [authGuard], loadComponent: () => import('./features/healthy/components/meal-details/meal-details.component').then((c) => c.MealDetailsComponent), title: 'Meal Details' },
            { path: 'profile', loadComponent: () => import('./features/user-profile/components/user-profile/userProfile.component').then((c) => c.UserProfileComponent), canActivate:[authGuard], title: 'Profile' },
        ]
    },
    {
        path: 'auth', loadChildren: () => import('./features/auth/routes/auth.routes').then((m) => m.authRoutes)
    }
];
