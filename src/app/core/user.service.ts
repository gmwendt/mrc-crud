import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, Capabilities } from './common/types';

@Injectable()
export class UserService {

  public currentUser: User;
  public typedPassword: string;
  
  constructor(private _http: HttpClient) { }
  
  addUser(data: User): Promise<User> {
    return new Promise((resolve, reject) => {
      (<any>data).capabilities = Capabilities.toJSON(data.capabilities);
      this._http.post<User>('/user', data)
        .subscribe(res => {
          res.capabilities = Capabilities.fromJSON(<string>res.capabilities);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getAllUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this._http.get<User[]>('/user')
        .subscribe(res => {
          res.map(res => {
            res.capabilities = Capabilities.fromJSON(<string>res.capabilities);
            res.birthDate = new Date(res.birthDate);
          });
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getUserByUsername(accountId: number, username: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this._http.get<User[]>('/user/accountRefId/' + accountId + '/userName/' + username)
        .subscribe(res => {
          if (!res || res.length == 0)
            resolve(null);

          res.map(res => { 
            res.capabilities = Capabilities.fromJSON(<string>res.capabilities);
            res.birthDate = new Date(res.birthDate);
          });

          resolve(res[0]);
        }, (err) => {
          reject(err);
        });
    });
  }

  listAccountUsers(accountId: number): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this._http.get<User[]>('/user/accountRefId/' + accountId)
        .subscribe(res => {
          res.map(res => { 
            res.capabilities = Capabilities.fromJSON(<string>res.capabilities);
            res.birthDate = new Date(res.birthDate);
          });
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  updateUser(data: User): Promise<any> {
    if (!data._id)
      return;
    
    return new Promise((resolve, reject) => {
        (<any>data).capabilities = Capabilities.toJSON(data.capabilities);
        this._http.put<User>('/user/' + data._id, data)
          .subscribe(res => {
            res.capabilities = Capabilities.fromJSON(<string>res.capabilities);
            res.birthDate = new Date(res.birthDate);
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  deleteUser(id: string) {
    return new Promise((resolve, reject) => {
      this._http.delete('/user/' + id)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
  });
  }

  generateSalt(): string {
    var mask = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*()-+=';
    return this.randomStringGenerator(mask, 8);
  }

  generateToken(): string {
    var mask = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return this.randomStringGenerator(mask, 24);
  }

  private randomStringGenerator(mask: string, length: number): string {
    var result = '';
    
    for (var i = length; i > 0; --i) 
      result += mask[Math.floor(Math.random() * mask.length)];

    return result;
  }
}