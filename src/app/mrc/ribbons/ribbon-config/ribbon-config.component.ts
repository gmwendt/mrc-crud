import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { User } from '../../common/types';

import { MrcContentService } from '../../mrc-content/mrc-content.service';

import { PageUsersComponent } from '../../pages/page-users/page-users.component';

import { UserService } from '../../../login/user.service';

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
	
	private item_users_clicked(): void {
		this._service.Current = PageUsersComponent;
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