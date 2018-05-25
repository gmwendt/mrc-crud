import { NgModule } from '@angular/core';

import { RibbonCadastroComponent } from './ribbon-cadastro/ribbon-cadastro.component';
import { RibbonConfigComponent } from './ribbon-config/ribbon-config.component';

// import { MaterialModule } from '../../material.module';

@NgModule({
	// imports: [ MaterialModule ],
	declarations: [ RibbonCadastroComponent, RibbonConfigComponent ],
	exports: [ RibbonCadastroComponent, RibbonConfigComponent ],
	entryComponents: [ RibbonCadastroComponent, RibbonConfigComponent ]
})
export class RibbonsModule { }