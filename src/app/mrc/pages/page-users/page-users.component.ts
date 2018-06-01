import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { User } from '../../common/types';

import { UserService } from '../../../login/user.service';

import { AccountService } from '../../../shared/account.service';
import { DialogService } from '../../../shared/dialog.service';
import { DialogAddUserComponent } from '../../../shared/dialog-add-user/dialog-add-user.component';

@Component({
	selector: 'page-users',
	templateUrl: './page-users.component.html',
	styleUrls: ['./page-users.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class PageUsersComponent implements OnInit { 
	
	private displayedColumns = ['current', 'username', 'name', 'administrator'];
	private dataSource;
	private _usersList: User[];

	constructor(private _account: AccountService, private _userService: UserService, private _dialog: DialogService) {
	}

	ngOnInit(): void {
		var accId = this._account.current.accountId.toString();
		this._account.getAccountByAccountId(accId).then(accs => {
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

	private add_user_clicked(): void {
		var dialogRef = this._dialog.open(DialogAddUserComponent, { width: '500px' });
		dialogRef.afterClosed().subscribe(result => {
			//TODO
		});
	}
}
