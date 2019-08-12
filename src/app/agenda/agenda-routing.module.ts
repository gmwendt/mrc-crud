import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MrcAgendaComponent } from './agenda.component';

const routes: Routes = [
  { path: '', component: MrcAgendaComponent,  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class MrcAgendaRoutingModule { }