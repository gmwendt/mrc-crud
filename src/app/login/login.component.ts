import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService} from './user.service';

import { LocalStorageConstants } from '../mrc/common/constants';
import { Account, User, Capabilities } from '../mrc/common/types';

import { DialogAlertButton, DialogAlertResult, DialogAlertData } from '../shared/dialog-alert/dialog-alert.component';
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
    //Mock to delete users
    //this._userService.deleteUser('5b3e2c23e99c4144988e601e');
    
     this._account.getAccountByAccountId('1005').then((acc => {
       if (acc.length == 0)
         return;
      
      this._userService.getUserByUsername(acc[0].accountId, 'admin').then((user => {
        if(user.length == 0)
          return;

          this._account.current = acc[0];
          this._userService.currentUser = user[0];
          this._userService.typedPassword = '123456';
          this._router.navigate(['home']);
      }));
     }));
  }

  private login(): void {
    this._account.getAccountByAccountId(this._accountId).then((acc: Account[]) => {
      if (acc.length == 0) {
        this.show_error_dialog('Conta inválida.');
        return;
      }

      this._userService.getUserByUsername(acc[0].accountId, this._userName).then((result: User[]) => {
        if(result.length == 0) {
          this.show_error_dialog('Nome de usuário inválido.');
          return;
        }

        var user: User = result[0];
        if (user.passwordHash != this.hashPassword(this._pwd, user.passwordSalt)) {
          this.show_error_dialog('Senha incorreta.');
          return;
        }

        this._userService.currentUser = user;
        this._userService.typedPassword = this._pwd;
        this._account.current = acc[0];

        this._router.navigate(['home']); 
      }, (err) => console.log(err));
    }, (err) => {
      console.log(err);
    });
  }

  private show_error_dialog(msg: string): void {
    var dialogData: DialogAlertData = {
      text: msg,
      caption: 'Erro',
      button: DialogAlertButton.OK
    };
    this._dialog.openAlert(dialogData).then(result => { });
  }

  private hashPassword(pwd: string, salt: string): string {
    return sha512.hex(pwd + salt);
  }
}