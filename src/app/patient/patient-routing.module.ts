import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientComponent } from './patient.component';

import { PagePatientConsultComponent } from './page-patient-consult/page-patient-consult.component';

const routes: Routes = [
  { path: '', component: PatientComponent,  },
  { path: 'consulta/:id', component: PagePatientConsultComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PatientRoutingModule { }