import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './mrc-routing.module';

import { MrcComponent }     from './mrc.component';
import { MrcContentComponent } from './mrc-content/mrc-content.component';
import { MrcHeaderComponent }     from './mrc-header/mrc-header.component';
import { MrcHeaderConfigComponent } from './mrc-header/mrc-header-config/mrc-header-config.component';
import { MrcHeaderMenuComponent } from './mrc-header-menu/mrc-header-menu.component';
import { MrcHomeComponent } from './mrc-home/mrc-home.component';
import { NavigationComponent }     from './navigation/navigation.component';

import { MrcContentService } from './mrc-content/mrc-content.service';
import { AuthGuardService } from '../login/auth-guard.service';

import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    MrcComponent, MrcContentComponent, MrcHeaderComponent, MrcHeaderConfigComponent, 
    MrcHeaderMenuComponent, MrcHomeComponent, NavigationComponent,
  ],
  imports: [ CommonModule, MaterialModule, routing ],
  exports: [ MrcComponent ],
  providers: [ AuthGuardService, MrcContentService ]
})
export class MrcModule { }