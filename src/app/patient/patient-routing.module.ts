import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientComponent } from './patient.component';

import { PagePatientEditComponent } from './page-patient-edit/page-patient-edit.component';

const routes: Routes = [
  { path: '', component: PatientComponent,  },
  { path: 'edit/:id', component: PagePatientEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PatientRoutingModule { }