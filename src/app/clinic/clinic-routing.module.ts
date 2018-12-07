import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClinicComponent } from './clinic.component';

import { PageClinicEditComponent } from './page-clinic-edit/page-clinic-edit.componen';

const routes: Routes = [
  { path: '', component: ClinicComponent,  },
  { path: 'edit/:id', component: PageClinicEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ClinicRoutingModule { }