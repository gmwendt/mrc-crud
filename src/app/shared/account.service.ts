import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

import { Account } from '../mrc/common/types';

@Injectable()
export class AccountService {

  constructor(private _http: Http) { }

  addAccount(data: Account) {
    return new Promise((resolve, reject) => {
        this._http.post('/account', data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }
  
  getAllAccounts(): Promise<Account[]> {
    return new Promise((resolve, reject) => {
      this._http.get('/account')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getAccountByAccountId(accountId: string): Promise<Account[]> {
    return new Promise((resolve, reject) => {
      this._http.get('/account/accountId/' + accountId)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteAccount(id: string) {
    return new Promise((resolve, reject) => {
        this._http.delete('/account/' + id)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }
}