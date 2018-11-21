import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

import { User, Capabilities } from './common/types';

@Injectable()
export class UserService {

  public currentUser: User;
  public typedPassword: string;
  
  constructor(private _http: Http) { }
  
  addUser(data: User): Promise<User> {
    return new Promise((resolve, reject) => {
      (<any>data).capabilities = Capabilities.toJSON(data.capabilities);
      this._http.post('/user', data)
        .map(res => res.json())
        .subscribe(res => {
          res.capabilities = Capabilities.fromJSON(res.capabilities);
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
          res.map(res => {
            res.capabilities = Capabilities.fromJSON(res.capabilities);
            res.birthDate = new Date(res.birthDate);
          });
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getUserByUsername(accountId: number, username: string): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this._http.get('/user/accountRefId/' + accountId + '/userName/' + username)
        .map(res => res.json())
        .subscribe(res => {
          res.map(res => { 
            res.capabilities = Capabilities.fromJSON(res.capabilities);
            res.birthDate = new Date(res.birthDate);
          });
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  listAccountUsers(accountId: number): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this._http.get('/user/accountRefId/' + accountId)
        .map(res => res.json())        
        .subscribe(res => {
          res.map(res => { 
            res.capabilities = Capabilities.fromJSON(res.capabilities);
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
        this._http.put('/user/' + data._id, data)
          .map(res => res.json())
          .subscribe(res => {
            res.capabilities = Capabilities.fromJSON(res.capabilities);
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