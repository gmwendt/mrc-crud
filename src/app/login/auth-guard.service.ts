
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { UserService } from './user.service';

var sha512 = require('js-sha512');

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private _router: Router, private _userService: UserService) { }
  
  canActivate(): boolean {
    if(!this.isAuthenticated()) {
      this._router.navigate(['mrc-login']);
      return false;
    }

    return true;
  }

  public isAuthenticated(): boolean {
    if (!this._userService.currentUser)
      return false;

    if (this._userService.currentUser.passwordHash == this.hashedPassword(this._userService.typedPassword + this._userService.currentUser.passwordSalt))
      return true;
  }

  private hashedPassword(pwd: string): string {
    return sha512.hex(pwd);
  }
}