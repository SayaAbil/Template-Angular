import { Routes } from '@angular/router';
import { LoginComponent } from './feature/login/login.component';
import { DefaultComponent } from './shared/component/default/default.component';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import { AuthGuard } from './shared/auth/auth.guard';

export const routes: Routes = [
 {
  path: 'home',
  component: DefaultComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
      data: {
        operations: 'VIEW_DASHBOARD'
      }
    },
  ]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
    ]
  },
];
