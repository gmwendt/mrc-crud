import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { PageProductsComponent } from '../pages/page-products/page-products.component';

export class OpenPaneEvent {
	name: string;
	paneType: any;
}

@Component({
	selector: 'navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class NavigationComponent { 

	@Output()
	openPane: EventEmitter<OpenPaneEvent>;
	
	//@ViewChild('menuProdutosTrigger')
	//private menuProdutos: MatMenuTrigger;

	constructor() {
		this.openPane = new EventEmitter<OpenPaneEvent>();
	}

	private listItemClicked(paneType: string): void {
		var event: OpenPaneEvent;

		switch (paneType) {
			case "produtos":
				event = { 
					name: 'Produtos',
					paneType: PageProductsComponent
				};
				break;
			
			default:
				// code...
				break;
		}
		
		this.openPane.emit(event);
	}
}
