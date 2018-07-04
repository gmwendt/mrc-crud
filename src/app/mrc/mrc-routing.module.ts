import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../login/auth-guard.service';
import { LoginComponent } from '../login/login.component';
import { MrcHomeComponent } from './mrc-home/mrc-home.component';
import { PageInvalidComponent } from './pages/page-invalid/page-invalid.component';
import { PageResetPasswordComponent } from './pages/page-reset-password/page-reset-password.component';
import { RegisterComponent } from '../register/register.component';

const mrcRoutes: Routes = [
  {
    path: 'login',
    // loadChildren: 'app/login/login.module#LoginModule'
    component: LoginComponent
  },
  {
    path: 'register',
    //loadChildren: 'app/register/register.module#RegisterModule'
    component: RegisterComponent
  },
  {
    path: 'home',
    canActivate: [AuthGuardService],
    component: MrcHomeComponent
  },
  {
    path: 'reset-pass/:accNum/:userName64/:token',
    component: PageResetPasswordComponent
  },
  {
    path: 'invalid-page',
    component: PageInvalidComponent
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(mrcRoutes);