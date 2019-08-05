import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { COMMON_COMPONENTS, ENTRY_COMPONENTS } from './common/components';
import { COMMON_PROVIDERS } from './common/providers';

import { AdministrativeAreaRoutingModule } from './administrative-area-routing.module';
import { AdministrativeAreaComponent } from './administrative-area.component';

@NgModule({
  imports: [CommonModule, AdministrativeAreaRoutingModule],
  declarations: [COMMON_COMPONENTS],
  exports: [COMMON_COMPONENTS],
  providers: [COMMON_PROVIDERS],
  bootstrap: [AdministrativeAreaComponent],
  entryComponents: [ENTRY_COMPONENTS]
})
export class AdministrativeAreaModule {
  
}