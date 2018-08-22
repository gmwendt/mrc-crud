import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthGuardService } from '../login/auth-guard.service';
import { UserService}  from '../login/user.service';
import { Account, Capabilities, User } from '../mrc/common/types';
import { AccountService } from '../shared/account.service';
import { SystemInfoService } from '../shared/system-info.service';
import { DialogAlertData, DialogAlertButton } from '../shared/dialog-alert/dialog-alert.component';
import { DialogService } from '../shared/dialog.service';

var sha512 = require('js-sha512');

@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  private _confirmPass: string;
  private _pass: string;

  private user: User = {
    accountRefId: 0, birthDate: new Date(), capabilities: new Capabilities(), email: '', name: '', passwordHash: '', passwordExpired: false, 
    passwordSalt: '', resetPwdToken: '', userName: '', isProfessional: false
  };
  private loading: boolean = false;

  constructor(private _accountService: AccountService, private _systemInfo: SystemInfoService, private _userService: UserService,
    private _auth: AuthGuardService, private _router: Router, private _dialog: DialogService) { 
  }

  ngOnInit() {
    if (this._auth.isAuthenticated()) {
      this._router.navigate(['home']);
      //TODO
    }
  }

  private create_user() {

    if (this._pass != this._confirmPass) {
      this.show_error_dialog('Senhas não conferem.'); 
      return;
    }
    this.loading = true;
    var nextId = this._systemInfo.systemInfo.nextAccountSequence;

    this.user.passwordSalt = this._userService.generateSalt();
    this.user.passwordHash = this.hashPassword(this._pass, this.user.passwordSalt);
    this.user.accountRefId = nextId;

    this.user.capabilities.accessGlobalFinances = true;
    this.user.capabilities.fullAccessAdministrativeTools = true;
    this.user.capabilities.scheduleAndRegisterPatient = true;

    var userList: string[] = [];
    userList.push(this.user.userName);

    var account: Account = {
      accountId: nextId,
      expireDate: new Date()
    };

    this._accountService.addAccount(account).then((result: Account) => {
      this._systemInfo.incrementSequence().then(() => {
        //TODO
        console.log('Account created');

        this._userService.addUser(this.user).then(user => {
          //TODO
          console.log('User created');
          this._router.navigate(['home']); 

        }, (err) => {
          this.loading = false;
          this.show_error_dialog(err);
        });
      }, (err) => { 
        this.loading = false;
        this.show_error_dialog(err); 
      });
    }, (err) => {
      this.loading = false;
      this.show_error_dialog(err);
    });
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
}