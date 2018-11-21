import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

import { Clinic } from './common/types';

@Injectable()
export class ClinicService {
  constructor(private _http: Http) { }

  addClinic(data: Clinic) {
    return new Promise((resolve, reject) => {
      this._http.post('/clinic', data)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getAllClinics(): Promise<Clinic[]> {
    return new Promise((resolve, reject) => {
      this._http.get('/clinic')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  listAccountClinics(accountId: number): Promise<Clinic[]> {
    return new Promise((resolve, reject) => {
      this._http.get('/clinic/accountRefId/' + accountId)
        .map(res => res.json())        
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteClinic(id: string) {
    return new Promise((resolve, reject) => {
        this._http.delete('/clinic/' + id)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  updateClinic(data: Clinic) {
    return new Promise((resolve, reject) => {
      this._http.put('/clinic/' + data._id, data)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}