import { Component } from '@angular/core';
import { UserService} from '../login/user.service';

var sha512 = require('js-sha512');

@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  private user = {};

  constructor(private _userService: UserService) { }

  private create_user() {
    this._userService.addUser(this.user).then((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });
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