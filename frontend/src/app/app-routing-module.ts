import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { authGuard, loginGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: Dashboard, canActivate: [authGuard] },
  {
    path: 'login',
    loadChildren: () => import('./features/login/login-module').then((m) => m.LoginModule),
    canActivate: [loginGuard],
  },
  {
    path: 'register',
    loadChildren: () => import('./features/register/register-module').then((m) => m.RegisterModule),
    canActivate: [loginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
