import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService} from './user.service';

import { LocalStorageConstants } from '../mrc/common/constants';
import { ProfessionalType, User, UserPrivileges, Account } from '../mrc/common/types';

import { DialogAlertButton, DialogAlertResult } from '../shared/dialog-alert/dialog-alert.component';
import { AccountService } from '../shared/account.service';
import { DialogService } from '../shared/dialog.service';

 var sha512 = require('js-sha512');

@Component({
  selector: 'mrc-login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  private _accountId: string;
  private _pwd: string;
  private _userName: string;

  constructor(private _account: AccountService, private _userService: UserService, private _router: Router, 
    private _dialog: DialogService) { }

  ngOnInit() {
    //DEV MOCK
  /*var user: User = { 
      email: "admin@mrc.com",
      name: "admin",
      password: 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413',
      userName: "admin"
    };

    this._userService.currentUser = user;
    this._userService.typedPassword = '123456';

    this._router.navigate(['home']); */ 
  }


  private login(): void {
    this._account.getAccountByAccountId(this._accountId).then((acc: Account[]) => {
      if (acc.length == 0) {
        this.show_error_dialog('Conta inválida.');
        return;
      }

      var userList: User[] = JSON.parse(acc[0].users);
      var user: User = userList.find(u => u.userName == this._userName);

      if (user.password != this.hashedPassword) {
        this.show_error_dialog('Senha incorreta.');
        return;
      }

      this._userService.currentUser = user;
      this._userService.typedPassword = this._pwd;
      this._account.current = acc[0];

      this._router.navigate(['home']); 

    }, (err) => {
      console.log(err);
    })
  }

  private show_error_dialog(msg: string): void {
    this._dialog.openAlert(msg, 'Erro', DialogAlertButton.OK).then(result => { });
  }

  private get hashedPassword(): string {
    return sha512.hex(this._pwd);
  }
}