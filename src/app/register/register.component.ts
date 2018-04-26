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
}