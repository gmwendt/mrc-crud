import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { MrcContentService } from '../../mrc-content/mrc-content.service';

import { PageInvalidComponent } from '../../pages/page-invalid/page-invalid.component';
import { PageProfessionalsComponent } from '../../pages/page-professionals/page-professionals.component';
import { PageUsersComponent } from '../../pages/page-users/page-users.component';

import { User } from '../../../core/common/types';
import { UserService } from '../../../core/user.service';

@Component({
	selector: 'ribbon-config',
	templateUrl: './ribbon-config.component.html',
	styleUrls: ['./ribbon-config.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class RibbonConfigComponent implements OnInit {

	private user: User;

	constructor(private _service: MrcContentService, private _userService: UserService) {
	}

	ngOnInit() {
		this.user = this._userService.currentUser;
	}
	
	private ribbon_item_clicked(page?: string): void {
		switch (page) {
			case 'users': this._service.Current = PageUsersComponent;
				break;
			case 'professionals': this._service.Current = PageProfessionalsComponent;
				break;
			default: this._service.Current = PageInvalidComponent;
		}
	}

	private get canRegisterUsers(): boolean {
		return this.user.capabilities.fullAccessAdministrativeTools || 
			this.user.capabilities.registerUsers;
	}

	private get canRegisterDocuments(): boolean {
		return this.user.capabilities.fullAccessAdministrativeTools || 
			this.user.capabilities.registerDocuments;
	}

	private get canRegisterProfessionals(): boolean {
		return this.user.capabilities.fullAccessAdministrativeTools || 
			this.user.capabilities.registerProfessionals;
	}

	private get showRegisterFooterAndDivider(): boolean {
		return this.canRegisterDocuments || this.canRegisterProfessionals || this.canRegisterUsers;
	}
}