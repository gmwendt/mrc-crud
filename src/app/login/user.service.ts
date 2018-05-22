import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

import { User } from '../mrc/common/types';

@Injectable()
export class UserService {

  public currentUser: User;
  public typedPassword: string;
  
  constructor(private _http: Http) { }
  
  addUser(data) {
    return new Promise((resolve, reject) => {
        this._http.post('/user', data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  getAllUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this._http.get('/user')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getUserByEmail(email: string): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this._http.get('/user/email/' + email)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}