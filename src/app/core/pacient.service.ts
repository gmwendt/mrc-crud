import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AddressInfo, Pacient } from './common/types';

@Injectable()
export class PacientService {
  constructor(private _http: HttpClient) { }

  addPacient(data: Pacient): Promise<Pacient> {
    return new Promise((resolve, reject) => {
      (<any>data).address = data.address ? data.address.toJSON() : '';
      this._http.post<Pacient>('/pacient', data)
        .subscribe(res => {
          res.address = res.address ? AddressInfo.fromJSON(res.address) : null;
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getAllPacients(): Promise<Pacient[]> {
    return new Promise((resolve, reject) => {
      this._http.get<Pacient[]>('/pacient')
        .subscribe(res => {
          res.map(res => res.address = res.address ? AddressInfo.fromJSON(res.address) : null);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getPacientById(id: string): Promise<Pacient>{
    return new Promise((resolve, reject) => {
      this._http.get<Pacient>('/pacient/' + id)
        .subscribe(res => {
          res.address = res.address ? AddressInfo.fromJSON(res.address) : null;
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  listAccountPacients(accountId: number): Promise<Pacient[]> {
    return new Promise((resolve, reject) => {
      this._http.get<Pacient[]>('/pacient/accountRefId/' + accountId)
        .subscribe(res => {
          res.map(res => res.address = res.address ? AddressInfo.fromJSON(res.address) : null);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deletePacient(id: string) {
    return new Promise((resolve, reject) => {
        this._http.delete('/pacient/' + id)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  updatePacient(data: Pacient): Promise<Pacient> {
    return new Promise((resolve, reject) => {
      (<any>data).address = data.address ? data.address.toJSON() : '';
      this._http.put<Pacient>('/pacient/' + data._id, data)
        .subscribe(res => {
          res.address = res.address ? AddressInfo.fromJSON(res.address) : null;
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}