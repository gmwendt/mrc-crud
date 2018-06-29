import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../common/types';

import { UserService } from '../../../login/user.service';

import { AccountService } from '../../../shared/account.service';
import { DialogService } from '../../../shared/dialog.service';

@Component({
	selector: 'page-reset-password',
	templateUrl: './page-reset-password.component.html',
	styleUrls: ['./page-reset-password.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class PageResetPasswordComponent implements OnDestroy, OnInit { 
	
	private _user: User;

	private _routeSubscription: any; 

	private _username: string;
	private _accNum: number;
	private _token: string;

	private password: string;
	private passwordConfirm: string;

	constructor(private _account: AccountService, private _userService: UserService, private _route: ActivatedRoute) {
	}
	
	ngOnInit() {
		this._routeSubscription = this._route.params.subscribe(params => {
			this._accNum = +params['accNum'];
			this._token = params['token'];
			this._username = atob(params['userName64']);

			this._userService.getUserByUsername(this._accNum, this._username).then((users: User[]) => {
				if (users.length == 0)
					return;
					
				this._user = users[0];	
			});
		});
	}

	// private retrieveUser(): Promise<User> {
		
	// }

	ngOnDestroy() {
		if (this._routeSubscription)
			this._routeSubscription.unsubscribe();
	}
}