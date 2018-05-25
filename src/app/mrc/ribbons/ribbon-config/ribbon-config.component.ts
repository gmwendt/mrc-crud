import { Component, ViewEncapsulation } from '@angular/core';

import { MrcContentService } from '../../mrc-content/mrc-content.service';

import { PageUsersComponent } from '../../pages/page-users/page-users.component';

@Component({
	selector: 'ribbon-config',
	templateUrl: './ribbon-config.component.html',
	styleUrls: ['./ribbon-config.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class RibbonConfigComponent {

	constructor(private _service: MrcContentService) {
		
	}
	
	private item_users_clicked(): void {
		this._service.Current = PageUsersComponent;
	}
}