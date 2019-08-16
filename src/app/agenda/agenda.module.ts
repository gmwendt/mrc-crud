import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { COMMON_COMPONENTS, ENTRY_COMPONENTS } from './common/components';
import { COMMON_PROVIDERS } from './common/providers';

import { MrcAgendaRoutingModule } from './agenda-routing.module';
import { MrcAgendaComponent } from './agenda.component';

import { MaterialModule } from '../material.module';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, MaterialModule, SharedModule, MrcAgendaRoutingModule],
  declarations: [COMMON_COMPONENTS],
  exports: [COMMON_COMPONENTS],
  providers: [COMMON_PROVIDERS],
  bootstrap: [MrcAgendaComponent],
  entryComponents: [ENTRY_COMPONENTS]
})
export class MrcAgendaModule {
  
}