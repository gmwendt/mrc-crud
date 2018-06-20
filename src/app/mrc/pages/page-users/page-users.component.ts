import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { User } from '../../common/types';

import { UserService } from '../../../login/user.service';

import { AccountService } from '../../../shared/account.service';
import { DialogService } from '../../../shared/dialog.service';
import { DialogAddUserComponent, DialogAddUserResult } from '../../../shared/dialog-add-user/dialog-add-user.component';
import { DialogAlertButton, DialogAlertData } from '../../../shared/dialog-alert/dialog-alert.component';

@Component({
	selector: 'page-users',
	templateUrl: './page-users.component.html',
	styleUrls: ['./page-users.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class PageUsersComponent implements OnInit { 
	
	private currentUser: User;
	private displayedColumns = ['current', 'username', 'name', 'commands'];
	private dataSource;

	private _usersList: User[];
	private _accId: number;

	constructor(private _account: AccountService, private _userService: UserService, private _dialog: DialogService) {
	}

	ngOnInit(): void {
		this.currentUser = this._userService.currentUser;
		this._accId = this._account.current.accountId;
		//Mock to delete users
		//this._userService.deleteUser('5b1ad4100e5d5319e42327a6');

		this._account.getAccountByAccountId(this._accId.toString()).then(accs => {
			if (accs.length == 0)
				return;

			this._userService.listAccountUsers(accs[0].accountId).then(users => {
				this._usersList = users;
				this.createTable();
			}, err => console.log(err));
		}, err => console.log(err));
	}

	private createTable(): void {
		this.dataSource = new MatTableDataSource(this._usersList);
	}

	private addUserToTable(user: User): void {
		this._usersList.push(user);
		this.dataSource.data = this._usersList;
	}

	private add_user_clicked(): void {
		var dialogRef = this._dialog.open(DialogAddUserComponent, { width: '650px' });
		dialogRef.componentInstance.usersList = this._usersList;
		dialogRef.afterClosed().subscribe((result: DialogAddUserResult) => {
			
			if (result == DialogAddUserResult.Cancel)
				return;

			var userResult = dialogRef.componentInstance.newUserData;
			var userData: User = {
				accountRefId: this._accId,
				capabilities: userResult.capabilities,
				email: userResult.email,
				name: userResult.name,
				userName: userResult.userName,
				passwordExpired: true,
				passwordHash: '',
				passwordSalt: '',
				resetPwdToken: this._userService.generateToken()
			};

			this._userService.addUser(userData).then((user: User) => {
				var dialogData: DialogAlertData = {
					text: 'Usuário criado com sucesso!',
					caption: 'Novo usuário',
					button: DialogAlertButton.None,
					textAlign: 'center',
					timer: 1500
				}

				this._dialog.openAlert(dialogData, { height: '70px' });

				this.addUserToTable(user);
			}, err => this._dialog.openAlert({ 
				text: '[ERRO] ' + err, 
				caption: 'Novo usuário', 
				button: DialogAlertButton.OK })
			);
		});
	}
}
