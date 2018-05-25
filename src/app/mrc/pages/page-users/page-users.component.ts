import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { User } from '../../common/types';
import { AccountService } from '../../../shared/account.service';

@Component({
	selector: 'page-users',
	templateUrl: './page-users.component.html',
	styleUrls: ['./page-users.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class PageUsersComponent implements OnInit { 
	
	private displayedColumns = ['name', 'username', 'administrator'];
	private dataSource: User[];

	constructor(private _account: AccountService) {
	}

	ngOnInit(): void {
		
	}
}
