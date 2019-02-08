import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';

import { COMMON_COMPONENTS, ENTRY_COMPONENTS } from './common/components';
import { COMMON_PROVIDERS } from './common/providers';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [ CommonModule, SharedModule, UsersRoutingModule ],
  declarations: [COMMON_COMPONENTS],
  exports: [COMMON_COMPONENTS],
  providers: [COMMON_PROVIDERS],
  bootstrap: [UsersComponent],
  entryComponents: [ENTRY_COMPONENTS]
})
export class UsersModule { }