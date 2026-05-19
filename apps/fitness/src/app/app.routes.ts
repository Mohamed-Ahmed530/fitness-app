import { Route } from '@angular/router';
import { authGuard } from './core/guards/auth/auth-guard';

export const appRoutes: Route[] = [
    {
        path: '', loadComponent: () => import('./core/layouts/main-layout/main-layout.component').then((c) => c.MainLayoutComponent), children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadComponent: () => import('./features/home/home.component').then((c) => c.HomeComponent), title: 'Home', canActivate:[authGuard] },
        ]
    },
    {
        path: 'auth', loadChildren: () => import('./features/auth/routes/auth.routes').then((m) => m.authRoutes)
    }
];
