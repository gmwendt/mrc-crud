import { NgModule } from '@angular/core';

import { PageProductsComponent } from './page-products/page-products.component';
import { PageResetPasswordComponent } from './page-reset-password/page-reset-password.component';
import { PageUsersComponent } from './page-users/page-users.component';

import { MaterialModule } from '../../material.module';

@NgModule({
	imports: [ MaterialModule ],
	declarations: [ PageProductsComponent, PageResetPasswordComponent, PageUsersComponent ],
	exports: [ PageProductsComponent, PageResetPasswordComponent, PageUsersComponent ],
	entryComponents: [ PageProductsComponent, PageUsersComponent ]
})
export class PagesModule { }