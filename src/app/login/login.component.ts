import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Account, User, Capabilities } from '../core/common/types';
import { AccountService } from '../core/account.service';
import { UserService} from '../core/user.service';
import { LoginService } from '../core/login.service';

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

  constructor(private _account: AccountService, private _userService: UserService, private _loginService: LoginService, 
    private _router: Router, private _dialog: DialogService) { }

  async ngOnInit() {
    //DEV MOCK
    this.loading = true;

    try {
      await this._userService.logout();

      var connected = await this._loginService.login('admin@mrc.com', 'admin');
      if (connected)
        this._router.navigate(['home']);
    }
    catch (error) {
      this.show_error_dialog(error);
    }

  }

  private login(): void {
    this.loading = true;
    this._account.getAccountByAccountId(this._accountId).then((acc: Account) => {
      if (!acc) {
        this.show_error_dialog('Conta inválida.');
        this.loading = false;
        return;
      }

      this._userService.getUserByUsername(acc.accountId, this._userName).then((result: User) => {
        if (!result) {
          this.show_error_dialog('Nome de usuário inválido.');
          this.loading = false;
          return;
        }

        var user: User = result;
        if (user.passwordHash != this.hashPassword(this._pwd, user.passwordSalt)) {
          this.show_error_dialog('Senha incorreta.');
          this.loading = false;
          return;
        }

        this._userService.currentUser = user;
        this._userService.typedPassword = this._pwd;
        this._account.current = acc;

        this._router.navigate(['home']); 
        this.loading = false;
      }, (err) => this.show_error_dialog(err));
    }, (err) => {
      this.show_error_dialog(err);
    });
  }

  private show_error_dialog(error: any): void {
    var msg = error instanceof HttpErrorResponse ? (error.error ? error.error["error"] : error["message"]) : error;

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