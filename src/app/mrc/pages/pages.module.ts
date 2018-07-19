import { NgModule } from '@angular/core';

import { PageInvalidComponent } from './page-invalid/page-invalid.component';
import { PageProfessionalsComponent } from './page-professionals/page-professionals.component';
import { PageResetPasswordComponent } from './page-reset-password/page-reset-password.component';
import { PageUsersComponent } from './page-users/page-users.component';

import { MaterialModule } from '../../material.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
	imports: [ MaterialModule, SharedModule ],
	declarations: [ PageInvalidComponent, PageProfessionalsComponent, PageResetPasswordComponent, PageUsersComponent ],
	exports: [ PageInvalidComponent, PageProfessionalsComponent, PageResetPasswordComponent, PageUsersComponent ],
	entryComponents: [ PageProfessionalsComponent, PageUsersComponent ]
})
export class PagesModule { }