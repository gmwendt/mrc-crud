import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { DialogService } from '../../../shared/dialog.service';

@Component({
	selector: 'page-professionals',
	templateUrl: './page-professionals.component.html',
	styleUrls: ['./page-professionals.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class PageProfessionalsComponent implements OnInit { 

	private loading = true;

	constructor(private _dialog: DialogService) {
	}

	ngOnInit() {

	}

	private add_professionals_clicked(): void {
		//todo
	}
}
