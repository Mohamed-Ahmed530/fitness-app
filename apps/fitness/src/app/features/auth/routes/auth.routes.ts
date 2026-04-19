import { Routes } from "@angular/router";

export const authRoutes: Routes = [
    {
        path: '', loadComponent: () => import('../../../core/layouts/auth-layout/auth-layout.component').then((c) => c.AuthLayoutComponent), children:[
            {path: '', redirectTo: 'login', pathMatch: 'full'},
            {path: 'login', loadComponent: () => import('../components/login/login.component').then((c) => c.LoginComponent), title: 'Login'},
            {path: 'register', loadComponent: () => import('../components/register/register.component').then((c) => c.RegisterComponent), title: 'Register'},
            {path: 'forgot-password', loadComponent: () => import('../components/forgot-password/forgot-password.component').then((c) => c.ForgotPasswordComponent), title: 'Forgot Password'}
        ] 
    }
]