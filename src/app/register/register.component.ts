import { Component } from '@angular/core';

import { UserService}  from '../login/user.service';
import { Account, Capabilities, User } from '../mrc/common/types';
import { AccountService } from '../shared/account.service';
import { SystemInfoService } from '../shared/system-info.service';

var sha512 = require('js-sha512');

@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  private _confirmPass: string;
  private _pass: string;

  private user: User = {
    accountRefId: 0, capabilities: [], email: '', name: '', passwordHash: '', passwordExpired: false, 
    passwordSalt: '', userName: ''
  };

  constructor(private _accountService: AccountService, private _systemInfo: SystemInfoService, private _userService: UserService) { 
  }

  private create_user() {

    if (this._pass != this._confirmPass) {
      //TODO: error message
      return;
    }
    
    var nextId = this._systemInfo.systemInfo.nextAccountSequence;

    this.user.passwordSalt = this.randomString(8);
    this.user.passwordHash = this.hashPassword(this._pass, this.user.passwordSalt);
    this.user.accountRefId = nextId;

    this.user.capabilities.push(Capabilities.AccessFinances);
    this.user.capabilities.push(Capabilities.RegisterSystemData);
    this.user.capabilities.push(Capabilities.RegisterUsers);
    this.user.capabilities.push(Capabilities.ScheduleAndRegisterPatient);

    var userList: string[] = [];
    userList.push(this.user.userName);

    var account: Account = {
      accountId: nextId,
      expireDate: new Date(),
      userList: JSON.stringify(userList)
    };

    this._accountService.addAccount(account).then((result: Account) => {
      this._systemInfo.incrementSequence().then(() => {
        //TODO
        console.log('Account created');

        this._userService.addUser(this.user).then(user => {
          //TODO
          console.log('User created');
        }, (err) => console.log(err));

      }, (err) => console.log(err));
    }, (err) => console.log(err));

  }

  private hashPassword(pwd: string, salt: string): string {
    return sha512.hex(pwd + salt);
  }

  private randomString(length: number): string {
    var mask = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    
    for (var i = length; i > 0; --i) 
      result += mask[Math.floor(Math.random() * mask.length)];

    return result;
  }
}