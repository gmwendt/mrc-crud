import { Component, ViewEncapsulation } from '@angular/core';
import { RibbonCadastroComponent } from '../ribbons/ribbon-cadastro/ribbon-cadastro.component';

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
			case 'cadastro':
				return RibbonCadastroComponent;
			default:
				return null;
		}
	}
}