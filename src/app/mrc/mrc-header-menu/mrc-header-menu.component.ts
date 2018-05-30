import { Component, ViewEncapsulation } from '@angular/core';

import { RibbonConfigComponent } from '../ribbons/ribbon-config/ribbon-config.component';

@Component({
	selector: 'mrc-header-menu',
	templateUrl: './mrc-header-menu.component.html',
	styleUrls: ['./mrc-header-menu.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class MrcHeaderMenuComponent {
	private _selected: string;	
	
	private get ribbonType(): any {
		switch (this._selected) {
			case 'configuracoes':
				return RibbonConfigComponent;
			default:
				return null;
		}
	}
}