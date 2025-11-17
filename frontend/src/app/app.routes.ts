import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./app/features/home/pages/home/home').then(m => m.Home) },
  { path: 'clientes', loadComponent: () => import('./app/features/clientes/pages/clientes/clientes').then(m => m.Clientes) },
  { path: 'planos', loadComponent: () => import('./app/features/planos/pages/planos/planos').then(m => m.Planos) },
  { path: 'login/pessoa-fisica', loadComponent: () => import('./app/features/auth/pages/login-pf/login-pf').then(m => m.LoginPf) },
  { path: 'login/pessoa-juridica', loadComponent: () => import('./app/features/auth/pages/login-pj/login-pj').then(m => m.LoginPj) },
  { path: 'login', loadComponent: () => import('./app/features/auth/pages/login/login').then(m => m.Login) },
  { path: '**', redirectTo: '' }
];
