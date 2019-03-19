import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserService } from './user.service';
import { User } from './common/types';

 var sha512 = require('js-sha512');

 @Injectable()
export class LoginService {

  constructor(private _http: HttpClient, private _userService: UserService) { }

  async login(email: string, password: string): Promise<User> {
    try {
      var user = await this._userService.getUserByEmail(email);
    }
    catch (error) {
      return Promise.reject(error);
    }

    if (!user) {
      return Promise.reject('E-mail ou senha inválido.');
    }

    if (user.passwordHash != this.hashPassword(password, user.passwordSalt)) {
      return Promise.reject('E-mail ou senha inválido.');
    }

    this._userService.currentUser = user;
    this._userService.typedPassword = password;

    return Promise.resolve(user);
  }

  private hashPassword(pwd: string, salt: string): string {
    return sha512.hex(pwd + salt);
  }
}