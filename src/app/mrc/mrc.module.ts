import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './mrc-routing.module';

import { ENTRY_COMPONENTS, COMMON_COMPONENTS } from './common/components';
import { COMMON_PROVIDERS } from './common/providers';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [ CommonModule, SharedModule, routing ],
  declarations: [COMMON_COMPONENTS],
  exports: [COMMON_COMPONENTS],
  providers: [ COMMON_PROVIDERS ],
  entryComponents: [ENTRY_COMPONENTS]
})
export class MrcModule { }