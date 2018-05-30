import { NgModule } from '@angular/core';

import { RibbonConfigComponent } from './ribbon-config/ribbon-config.component';

// import { MaterialModule } from '../../material.module';

@NgModule({
	// imports: [ MaterialModule ],
	declarations: [ RibbonConfigComponent ],
	exports: [ RibbonConfigComponent ],
	entryComponents: [ RibbonConfigComponent ]
})
export class RibbonsModule { }