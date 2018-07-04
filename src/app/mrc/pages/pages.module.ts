import { NgModule } from '@angular/core';

import { PageInvalidComponent } from './page-invalid/page-invalid.component';
import { PageProductsComponent } from './page-products/page-products.component';
import { PageResetPasswordComponent } from './page-reset-password/page-reset-password.component';
import { PageUsersComponent } from './page-users/page-users.component';

import { MaterialModule } from '../../material.module';

@NgModule({
	imports: [ MaterialModule ],
	declarations: [ PageInvalidComponent, PageProductsComponent, PageResetPasswordComponent, PageUsersComponent ],
	exports: [ PageInvalidComponent, PageProductsComponent, PageResetPasswordComponent, PageUsersComponent ],
	entryComponents: [ PageProductsComponent, PageUsersComponent ]
})
export class PagesModule { }