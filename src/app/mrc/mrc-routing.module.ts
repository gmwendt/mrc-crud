import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../login/auth-guard.service';
import { MrcHomeComponent } from './mrc-home/mrc-home.component';
import { PageInvalidComponent } from './pages/page-invalid/page-invalid.component';
import { PageResetPasswordComponent } from './pages/page-reset-password/page-reset-password.component';

const mrcRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('app/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('app/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuardService],
    component: MrcHomeComponent
  },
  {
    path: 'clinicas',
    canActivate: [AuthGuardService],
    loadChildren: () => import('app/clinic/clinic.module').then(m => m.ClinicModule)
  },
  {
    path: 'pacientes',
    canActivate: [AuthGuardService],
    loadChildren: () => import('app/patient/patient.module').then(m => m.PatientModule)
  },
  {
    path: 'usuarios',
    canActivate: [AuthGuardService],
    loadChildren: () => import('app/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'configuracoes-usuario',
    canActivate: [AuthGuardService],
    loadChildren: () => import('app/user-configurations/user-configurations.module').then(m => m.UserConfigurationsModule)
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
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: '**', component: PageInvalidComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(mrcRoutes);