import { MrcComponent }     from '../mrc.component';

import { MrcContentComponent } from '../mrc-content/mrc-content.component';

import { MrcHeaderComponent }     from '../mrc-header/mrc-header.component';
import { MrcHeaderConfigComponent } from '../mrc-header/mrc-header-config/mrc-header-config.component';
import { MrcHeaderMenuComponent } from '../mrc-header-menu/mrc-header-menu.component';

import { MrcHomeComponent } from '../mrc-home/mrc-home.component';

import { PageInvalidComponent } from '../pages/page-invalid/page-invalid.component';

import { PageProfessionalsComponent } from '../pages/page-professionals/page-professionals.component';

import { PageResetPasswordComponent } from '../pages/page-reset-password/page-reset-password.component';

import { PageUsersComponent } from '../pages/page-users/page-users.component';

import { RibbonConfigComponent } from '../ribbons/ribbon-config/ribbon-config.component';

export const COMMON_COMPONENTS: Array<any> = [
  MrcComponent, 
  MrcContentComponent, 
  MrcHeaderComponent, MrcHeaderConfigComponent, MrcHeaderMenuComponent, 
  MrcHomeComponent, 
  PageInvalidComponent, PageProfessionalsComponent, PageResetPasswordComponent, PageUsersComponent,
  RibbonConfigComponent
];

export const ENTRY_COMPONENTS: Array<any> = [
  PageProfessionalsComponent, PageUsersComponent, RibbonConfigComponent
];