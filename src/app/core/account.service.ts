import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Account } from './common/types';

@Injectable()
export class AccountService {

  public current: Account;

  constructor(private _http: HttpClient) { }

  addAccount(data: Account) {
    return new Promise((resolve, reject) => {
        this._http.post('/account', data)
        .subscribe(res => resolve(res), err => reject(err));
    });
  }
  
  getAllAccounts(): Promise<Account[]> {
    return new Promise((resolve, reject) => {
      this._http.get<Account[]>('/account')
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getAccountByAccountId(accountId: string): Promise<Account> {
    return new Promise((resolve, reject) => {
      this._http.get<Account[]>('/account/accountId/' + accountId)
        .subscribe(res => {
          if (!res || res.length == 0)
            resolve(null);
          resolve(res[0]);
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

  updateAccount(id: string, data: Account) {
    return new Promise((resolve, reject) => {
      this._http.put('/account/' + id, data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
  });
  }
}