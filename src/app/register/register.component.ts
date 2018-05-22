import { Component } from '@angular/core';

import { UserService}  from '../login/user.service';
import { User, Account } from '../mrc/common/types';
import { AccountService } from '../shared/account.service';
import { SystemInfoService } from '../shared/system-info.service';

var sha512 = require('js-sha512');

@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  private _confirmPass: string;

  private user: User = {
    email: '', name: '', password: '', userName: ''
  };

  constructor(private _accountService: AccountService, private _systemInfo: SystemInfoService, private _userService: UserService) { }

  private create_user() {

    if (this.user.password != this._confirmPass) {
      //TODO: error message
      return;
    }

    this.user.password = this.hashedPassword(this._confirmPass);

    var userList: User[] = [];
    userList.push(this.user);

    var nextId = this._systemInfo.systemInfo.nextAccountSequence;
    var account: Account = {
      expireDate: new Date(),
      id: nextId,
      users: JSON.stringify(userList) 
    }

    this._accountService.addAccount(account).then((result) => {
      this._systemInfo.incrementSequence().then(() => {
        //TODO
        console.log('User created');
      }, (err) => console.log(err));
    }, (err) => console.log(err));

  }

  private hashedPassword(pwd: string): string {
    return sha512.hex(pwd);
  }

  private guid_generator(): string {
    var s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
}