import { NgModule } from '@angular/core';
import { Dashboard } from './features/dashboard/dashboard';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/login/login-module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./features/register/register-module').then((m) => m.RegisterModule),
  },
  {
    path: '',
    component: Dashboard,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
