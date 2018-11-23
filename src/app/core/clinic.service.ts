import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Clinic } from './common/types';

@Injectable()
export class ClinicService {
  constructor(private _http: HttpClient) { }

  addClinic(data: Clinic) {
    return new Promise((resolve, reject) => {
      this._http.post('/clinic', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getAllClinics(): Promise<Clinic[]> {
    return new Promise((resolve, reject) => {
      this._http.get<Clinic[]>('/clinic')
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  listAccountClinics(accountId: number): Promise<Clinic[]> {
    return new Promise((resolve, reject) => {
      this._http.get<Clinic[]>('/clinic/accountRefId/' + accountId)
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
      this._http.put<Clinic>('/clinic/' + data._id, data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}