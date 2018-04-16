import { Component, ViewEncapsulation } from '@angular/core';

import { MrcContentService } from './mrc-content.service';

@Component({
	selector: 'mrc-content',
	templateUrl: './mrc-content.component.html',
	//styleUrls: ['./mrc-content.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class MrcContentComponent {
	
	constructor(private _service: MrcContentService) {		
	}
	
	private get Current(): any {
		return this._service.Current;
	}
}