
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { UserService } from './user.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private _router: Router, private _userService: UserService) { }
  
  canActivate(): boolean {
    if(!this.isAuthenticated()) {
      this._router.navigate(['login']);
      return false;
    }

    return true;
  }

  public isAuthenticated(): boolean {
    if (this._userService.currentUser)
      return true;
  }
}