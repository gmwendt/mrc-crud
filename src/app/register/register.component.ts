import { Component } from '@angular/core';

import { RegisterService } from './register.service';

import { UserService}  from '../login/user.service';
import { User } from '../mrc/common/types';
import { SystemInfoService } from '../shared/system-info.service';

var sha512 = require('js-sha512');

@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  private _confirmPass: string;

  private user: User;

  constructor(private _register: RegisterService, private _systemInfo: SystemInfoService, private _userService: UserService) { }

  private create_user() {

    if (this.user.password != this._confirmPass) {
      //TODO: error message
      return;
    }

    var nextId = this._systemInfo.systemInfo.nextAccountSequence;

    // this._userService.addUser(this.user).then((result) => {
    //   console.log(result);
    // }, (err) => {
    //   console.log(err);
    // });
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