import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

import { RibbonConfigComponent } from './ribbon-config/ribbon-config.component';

// import { MaterialModule } from '../../material.module';

@NgModule({
	imports: [ BrowserModule, CommonModule ],
	declarations: [ RibbonConfigComponent ],
	exports: [ RibbonConfigComponent ],
	entryComponents: [ RibbonConfigComponent ]
})
export class RibbonsModule { }