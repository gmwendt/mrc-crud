import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrativeAreaComponent } from './administrative-area.component';

const routes: Routes = [
  { path: '', component: AdministrativeAreaComponent,  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AdministrativeAreaRoutingModule { }