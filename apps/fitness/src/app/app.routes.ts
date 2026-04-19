import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '', loadComponent: () => import('./core/layouts/main-layout/main-layout.component').then((c) => c.MainLayoutComponent), title: 'Home'
    },
    {
        path: 'auth', loadChildren: () => import('./features/auth/routes/auth.routes').then((m) => m.authRoutes)
    }
];
