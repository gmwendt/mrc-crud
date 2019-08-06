import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { COMMON_COMPONENTS, ENTRY_COMPONENTS } from './common/components';
import { COMMON_PROVIDERS } from './common/providers';

import { UserConfigurationsRoutingModule } from './user-configurations-routing.module';
import { UserConfigurationsComponent } from './user-configurations.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule, UserConfigurationsRoutingModule],
  declarations: [COMMON_COMPONENTS],
  exports: [COMMON_COMPONENTS],
  providers: [COMMON_PROVIDERS],
  bootstrap: [UserConfigurationsComponent],
  entryComponents: [ENTRY_COMPONENTS]
})
export class UserConfigurationsModule {
  
}