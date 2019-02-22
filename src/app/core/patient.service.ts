import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AddressInfo, Patient, Anamneses } from './common/types';

@Injectable()
export class PatientService {
  constructor(private _http: HttpClient) { }

  addPatient(data: Patient): Promise<Patient> {
    var obj = this.clone(data);
    return new Promise((resolve, reject) => {
      (<any>obj).address = data.address ? data.address.toJSON() : '';
      (<any>obj).anamneses = data.anamneses ? JSON.stringify(data.anamneses.map(a => a.toJSON())) : undefined;
      this._http.post<Patient>('/patient', obj)
        .subscribe(res => {
          res.address = res.address ? AddressInfo.fromJSON(res.address) : null;
          res.anamneses = res.anamneses ? JSON.parse(<any>res.anamneses).map(a => Anamneses.fromJSON(a)) : undefined;
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getAllPatients(): Promise<Patient[]> {
    return new Promise((resolve, reject) => {
      this._http.get<Patient[]>('/patient')
        .subscribe(res => {
          res.map(res => res.address = res.address ? AddressInfo.fromJSON(res.address) : null);
          res.map(res => {
            res.anamneses = res.anamneses ? JSON.parse(<any>res.anamneses).map(a => Anamneses.fromJSON(a)) : undefined;
          });
          
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
          res.anamneses = res.anamneses ? JSON.parse(<any>res.anamneses).map(a => Anamneses.fromJSON(a)) : undefined;
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
          res.map(res => {
            res.anamneses = res.anamneses ? JSON.parse(<any>res.anamneses).map(a => Anamneses.fromJSON(a)) : undefined;
          });
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
    var obj = this.clone(data);
    return new Promise((resolve, reject) => {
      (<any>obj).address = data.address ? data.address.toJSON() : '';
      (<any>obj).anamneses = data.anamneses ? JSON.stringify(data.anamneses.map(a => a.toJSON())) : undefined;
      this._http.put<Patient>('/patient/' + data._id, obj)
        .subscribe(res => {
          res.address = res.address ? AddressInfo.fromJSON(res.address) : null;
          res.anamneses = res.anamneses ? JSON.parse(<any>res.anamneses).map(a => Anamneses.fromJSON(a)) : undefined;
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  private clone(data: Patient): Patient {
    return Object.assign({}, data);
  }
}