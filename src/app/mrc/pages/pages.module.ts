import { NgModule } from '@angular/core';

import { PageProductsComponent } from './page-products/page-products.component';

import { MaterialModule } from '../../material.module';

@NgModule({
	imports: [ MaterialModule ],
	declarations: [ PageProductsComponent ],
	exports: [ PageProductsComponent ],
	entryComponents: [ PageProductsComponent ]
})
export class PagesModule { }