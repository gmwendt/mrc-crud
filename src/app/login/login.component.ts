import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService} from './user.service';

import { LocalStorageConstants } from '../mrc/common/constants';
import { User } from '../mrc/common/types';

 var sha512 = require('js-sha512');

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  private _pwd: string;
  private _email: string;

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
    //DEV
    var user: User = { 
      companyCnpj: 36712522000163,
      email:"admin@mrc.com",
      id:1,
      name:"admin"
    };

    this._userService.currentUser = user;

    this._router.navigate(['home']);  
  }


  private login(): void {
    this._userService.getUserByEmail(this._email).then((result: any[]) => {
      if (result.length == 0)
        return;
      
      var user = result[0];
      if (user.password != this._pwd)
        return;

      localStorage.setItem(LocalStorageConstants.MRC_USER, JSON.stringify(user));
      this._router.navigate(['home']);    
    }, (err) => {
      console.log(err);
    });
  }

  private get hashedPassword(): string {
    return sha512.hex(this._pwd);
  }
}