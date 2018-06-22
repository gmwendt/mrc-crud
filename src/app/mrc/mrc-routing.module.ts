import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../login/auth-guard.service';
import { LoginComponent } from '../login/login.component';
import { MrcComponent } from './mrc.component';
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
    component: MrcComponent
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(mrcRoutes);