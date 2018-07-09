import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { User } from '../../common/types';

import { UserService } from '../../../login/user.service';

import { AccountService } from '../../../shared/account.service';
import { DialogService } from '../../../shared/dialog.service';
import { DialogAddUserComponent, DialogAddUserResult } from '../../../shared/dialog-add-user/dialog-add-user.component';
import { DialogAlertButton, DialogAlertData, DialogAlertResult } from '../../../shared/dialog-alert/dialog-alert.component';

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
		var dialogRef = this._dialog.open(DialogAddUserComponent, { height:'260px', width: '650px' });
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
				console.log('Reset password link: http://localhost:4000/reset-pass/' + this._accId + '/' + btoa(user.userName).replace(/=/g , '') + '/' + user.resetPwdToken);
				var dialogData: DialogAlertData = {
					text: 'Usuário criado com sucesso! Um email será enviado para ' + user.email + ' com os passos para definição de senha.',
					caption: 'Novo usuário',
					button: DialogAlertButton.OK,
					textAlign: 'center',
					textHeight: '70px'
				}

				this._dialog.openAlert(dialogData, { height: '183px' });

				this.addUserToTable(user);
			}, err => this.show_error_dialog(err));
		});
	}

	private delete_user_clicked(user: User): void {
		var dialogData: DialogAlertData = {
			text: 'Deseja remover ' + user.name + '?',
			caption: 'Remover usuário',
			button: DialogAlertButton.YesNo,
			textAlign: 'center'
		}

		this._dialog.openAlert(dialogData, { height: '120px' }).then(res => {
			if (res == DialogAlertResult.No)
				return;

			var index = this._usersList.indexOf(user);
			this._userService.deleteUser(user._id).then((resp: Response) => {
				if(!resp.ok){
					this.show_error_dialog(resp.statusText);
					return;
				}
		
				this._usersList.splice(index, 1);
				this.dataSource.data = this._usersList;
			}, err => this.show_error_dialog(err));	
		});
	}

	private show_error_dialog(msg: string): void {
    var dialogData: DialogAlertData = {
      text: '[ERRO] ' + msg,
      caption: 'Erro',
      button: DialogAlertButton.OK
    };
    this._dialog.openAlert(dialogData, { height: '150px' }).then(result => { });
  }
}
