import { Component, ViewEncapsulation } from '@angular/core';

import { MrcContentService } from '../../mrc-content/mrc-content.service';

import { PageProductsComponent } from '../../pages/page-products/page-products.component';

@Component({
	selector: 'ribbon-cadastro',
	templateUrl: './ribbon-cadastro.component.html',
	styleUrls: ['./ribbon-cadastro.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class RibbonCadastroComponent {

	constructor(private _service: MrcContentService) {
		
	}
	
	private item_clicked(): void {
		this._service.Current = PageProductsComponent;
	}
}