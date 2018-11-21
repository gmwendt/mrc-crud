import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  

import { RibbonConfigComponent } from './ribbon-config/ribbon-config.component';

@NgModule({
	imports: [ CommonModule ],
	declarations: [ RibbonConfigComponent ],
	exports: [ RibbonConfigComponent ],
	entryComponents: [ RibbonConfigComponent ]
})
export class RibbonsModule { }