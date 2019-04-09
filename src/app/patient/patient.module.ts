import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientComponent } from './patient.component';
import { PatientRoutingModule } from './patient-routing.module';

import { COMMON_COMPONENTS, ENTRY_COMPONENTS } from './common/components';
import { COMMON_PROVIDERS } from './common/providers';

import { SharedModule } from '../shared/shared.module';

import { WidgetModule } from '../widgets/widgets.module';

@NgModule({
  imports: [ CommonModule, SharedModule, PatientRoutingModule, WidgetModule ],
  declarations: [COMMON_COMPONENTS],
  exports: [COMMON_COMPONENTS],
  providers: [COMMON_PROVIDERS],
  bootstrap: [PatientComponent],
  entryComponents: [ENTRY_COMPONENTS]
})
export class PatientModule { }