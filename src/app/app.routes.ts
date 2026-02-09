// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/register/register';

export const routes: Routes = [
  { path: '', component: LoginComponent },             // login page shows first
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // protected
   { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }                       // fallback
];
