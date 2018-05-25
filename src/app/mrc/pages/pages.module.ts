import { NgModule } from '@angular/core';

import { PageProductsComponent } from './page-products/page-products.component';
import { PageUsersComponent } from './page-users/page-users.component';

import { MaterialModule } from '../../material.module';

@NgModule({
	imports: [ MaterialModule ],
	declarations: [ PageProductsComponent, PageUsersComponent ],
	exports: [ PageProductsComponent, PageUsersComponent ],
	entryComponents: [ PageProductsComponent, PageUsersComponent ]
})
export class PagesModule { }