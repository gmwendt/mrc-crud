import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AddressInfo, Patient } from './common/types';

@Injectable()
export class PatientService {
  constructor(private _http: HttpClient) { }

  addPatient(data: Patient): Promise<Patient> {
    return new Promise((resolve, reject) => {
      (<any>data).address = data.address ? data.address.toJSON() : '';
      this._http.post<Patient>('/patient', data)
        .subscribe(res => {
          res.address = res.address ? AddressInfo.fromJSON(res.address) : null;
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getAllPatients(): Promise<Patient[]> {
    return new Promise((resolve, reject) => {
      this._http.get<Patient[]>('/pacient')
        .subscribe(res => {
          res.map(res => res.address = res.address ? AddressInfo.fromJSON(res.address) : null);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getPatientById(id: string): Promise<Patient>{
    return new Promise((resolve, reject) => {
      this._http.get<Patient>('/patient/' + id)
        .subscribe(res => {
          res.address = res.address ? AddressInfo.fromJSON(res.address) : null;
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  listAccountPatients(accountId: number): Promise<Patient[]> {
    return new Promise((resolve, reject) => {
      this._http.get<Patient[]>('/patient/accountRefId/' + accountId)
        .subscribe(res => {
          res.map(res => res.address = res.address ? AddressInfo.fromJSON(res.address) : null);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deletePatient(id: string) {
    return new Promise((resolve, reject) => {
        this._http.delete('/patient/' + id)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  updatePatient(data: Patient): Promise<Patient> {
    return new Promise((resolve, reject) => {
      (<any>data).address = data.address ? data.address.toJSON() : '';
      this._http.put<Patient>('/patient/' + data._id, data)
        .subscribe(res => {
          res.address = res.address ? AddressInfo.fromJSON(res.address) : null;
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}