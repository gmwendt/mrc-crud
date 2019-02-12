import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacientComponent } from './pacient.component';

const routes: Routes = [
  { path: '', component: PacientComponent,  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PacientRoutingModule { }