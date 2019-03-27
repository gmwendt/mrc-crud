import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientComponent } from './patient.component';

import { PageAnamnesesEditComponent } from './page-anamneses-edit/page-anamneses-edit.component';
import { PagePatientConsultComponent } from './page-patient-consult/page-patient-consult.component';
import { PagePatientEdit } from './page-patient-edit/page-patient-edit.component';

const routes: Routes = [
  { path: '', component: PatientComponent,  },
  { path: 'consulta/:id', component: PagePatientConsultComponent },
  { path: 'consulta/:id/anamneses/:anamnesesId', component: PageAnamnesesEditComponent },
  { path: 'edit/:id', component: PagePatientEdit}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PatientRoutingModule { }