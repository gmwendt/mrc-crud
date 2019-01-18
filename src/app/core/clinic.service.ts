import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AddressInfo, Clinic } from './common/types';

@Injectable()
export class ClinicService {
  constructor(private _http: HttpClient) { }

  addClinic(data: Clinic): Promise<Clinic> {
    return new Promise((resolve, reject) => {
      (<any>data).address = data.address.toJSON();
      this._http.post<Clinic>('/clinic', data)
        .subscribe(res => {
          res.address = res.address ? AddressInfo.fromJSON(res.address) : null;
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
          res.map(res => res.address = res.address ? AddressInfo.fromJSON(res.address) : null);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getClinicById(id: string): Promise<Clinic>{
    return new Promise((resolve, reject) => {
      this._http.get<Clinic>('/clinic/' + id)
        .subscribe(res => {
          res.address = res.address ? AddressInfo.fromJSON(res.address) : null;
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
          res.map(res => res.address = res.address ? AddressInfo.fromJSON(res.address) : null);
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

  updateClinic(data: Clinic): Promise<Clinic> {
    return new Promise((resolve, reject) => {
      (<any>data).address = data.address.toJSON();
      this._http.put<Clinic>('/clinic/' + data._id, data)
        .subscribe(res => {
          res.address = res.address ? AddressInfo.fromJSON(res.address) : null;
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}