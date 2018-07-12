import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../common/types';

import { UserService } from '../../../login/user.service';

import { AccountService } from '../../../shared/account.service';
import { DialogService } from '../../../shared/dialog.service';
import { DialogAlertData, DialogAlertButton } from '../../../shared/dialog-alert/dialog-alert.component';

var sha512 = require('js-sha512');

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
	private errorMsg: string;
	private loading: boolean = true;

	constructor(private _account: AccountService, private _userService: UserService, private _dialog: DialogService,
		private _actRoute: ActivatedRoute, private _router: Router) {
	}
	
	ngOnInit() {
		this._routeSubscription = this._actRoute.params.subscribe(params => {
			this._accNum = +params['accNum'];
			this._token = params['token'];
			this._username = atob(params['userName64']);

			this._userService.getUserByUsername(this._accNum, this._username).then((users: User[]) => {
				if (users.length == 0) {
					this._router.navigate(['invalid-page']);
					return; 
				}

				if (users[0].resetPwdToken != this._token) {
					this._router.navigate(['invalid-page']);
					return; 
				}
					
				this._user = users[0];	
				this.loading = false;
			}, err => this.show_error_dialog(err));
		}, err => this.show_error_dialog(err));
	}

	private ok_clicked(): void {
		if (!this._user) {
			this.errorMsg = 'Este usuário não foi localizado'
			return;
		}
		if (this.password != this.passwordConfirm) {
			this.errorMsg = 'Senhas não conferem';
			return;
		}

		this._user.passwordSalt = this._userService.generateSalt();
		this._user.passwordHash = this.hashPassword(this.password, this._user.passwordSalt);
		this._user.resetPwdToken = '';
		this._user.passwordExpired = false;

		this._userService.updateUser(this._user).then(result => {
			var dialogData: DialogAlertData = {
				caption: 'Nova senha',
				text: 'Sua senha foi atualizada com sucesso!',
				button: DialogAlertButton.OK,
				textAlign: 'center'
			}

			this._dialog.openAlert(dialogData).then(() => {
				this._router.navigate(['login']);
			});
		}, err => this.show_error_dialog(err));
	}

	private hashPassword(pwd: string, salt: string): string {
    return sha512.hex(pwd + salt);
	}
	
	private show_error_dialog(msg: string): void {
    var dialogData: DialogAlertData = {
      text: msg,
      caption: 'Erro',
      button: DialogAlertButton.OK,
    };
    this._dialog.openAlert(dialogData).then(result => { });
  }

	ngOnDestroy() {
		if (this._routeSubscription)
			this._routeSubscription.unsubscribe();
	}
}