import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClinicComponent } from './clinic.component';
import { ClinicRoutingModule } from './clinic-routing.module';

import { COMMON_COMPONENTS, ENTRY_COMPONENTS } from './common/components';
import { COMMON_PROVIDERS } from './common/providers';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [ CommonModule, SharedModule, ClinicRoutingModule ],
  declarations: [COMMON_COMPONENTS],
  exports: [COMMON_COMPONENTS],
  providers: [COMMON_PROVIDERS],
  bootstrap: [ClinicComponent],
  entryComponents: [ENTRY_COMPONENTS]
})
export class ClinicModule { }