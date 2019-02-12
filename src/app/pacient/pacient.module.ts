import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientComponent } from './pacient.component';
import { PacientRoutingModule } from './pacient-routing.module';

import { COMMON_COMPONENTS, ENTRY_COMPONENTS } from './common/components';
import { COMMON_PROVIDERS } from './common/providers';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [ CommonModule, SharedModule, PacientRoutingModule ],
  declarations: [COMMON_COMPONENTS],
  exports: [COMMON_COMPONENTS],
  providers: [COMMON_PROVIDERS],
  bootstrap: [PacientComponent],
  entryComponents: [ENTRY_COMPONENTS]
})
export class PacientModule { }