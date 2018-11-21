import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Account, User, Capabilities } from '../core/common/types';
import { AccountService } from '../core/account.service';
import { UserService} from '../core/user.service';

import { LocalStorageConstants } from '../mrc/common/constants';

import { DialogAlertButton, DialogAlertResult, DialogAlertData } from '../shared/dialog-alert/dialog-alert.component';
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
  
  private loading = false;

  constructor(private _account: AccountService, private _userService: UserService, private _router: Router, 
    private _dialog: DialogService) { }

  ngOnInit() {
    //DEV MOCK
    // this.loading = true;
    // this._account.getAccountByAccountId('1009').then((acc => {
    //   if (acc.length == 0)
    //     return;
      
    //   this._userService.getUserByUsername(acc[0].accountId, 'admin').then((user => {
    //     if(user.length == 0)
    //       return;

    //       this._account.current = acc[0];
    //       this._userService.currentUser = user[0];
    //       this._userService.typedPassword = 'admin';
    //       this._router.navigate(['home']);
    //       this.loading = false;
    //   }));
    // }));
  }

  private login(): void {
    this.loading = true;
    this._account.getAccountByAccountId(this._accountId).then((acc: Account[]) => {
      if (acc.length == 0) {
        this.show_error_dialog('Conta inválida.');
        this.loading = false;
        return;
      }

      this._userService.getUserByUsername(acc[0].accountId, this._userName).then((result: User[]) => {
        if(result.length == 0) {
          this.show_error_dialog('Nome de usuário inválido.');
          this.loading = false;
          return;
        }

        var user: User = result[0];
        if (user.passwordHash != this.hashPassword(this._pwd, user.passwordSalt)) {
          this.show_error_dialog('Senha incorreta.');
          this.loading = false;
          return;
        }

        this._userService.currentUser = user;
        this._userService.typedPassword = this._pwd;
        this._account.current = acc[0];

        this._router.navigate(['home']); 
        this.loading = false;
      }, (err) => this.show_error_dialog(err));
    }, (err) => {
      this.show_error_dialog(err);
    });
  }

  private show_error_dialog(msg: string): void {
    var dialogData: DialogAlertData = {
      text: msg,
      caption: 'Erro',
      button: DialogAlertButton.OK,
    };
    this._dialog.openAlert(dialogData).then(result => { });
  }

  private hashPassword(pwd: string, salt: string): string {
    return sha512.hex(pwd + salt);
  }
}