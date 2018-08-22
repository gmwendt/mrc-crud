import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

import { Professional } from '../mrc/common/types';

@Injectable()
export class ProfessionalService {
  constructor(private _http: Http) { }

  addProfessional(data: Professional) {
    return new Promise((resolve, reject) => {
        this._http.post('/professional', data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  getAllProfessionals(): Promise<Professional[]> {
    return new Promise((resolve, reject) => {
      this._http.get('/professional')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getProfessionalByUserId(userId: string): Promise<Professional[]> {
    return new Promise((resolve, reject) => {
      this._http.get('/professional/userRefId/' + userId)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteProfessional(id: string) {
    return new Promise((resolve, reject) => {
        this._http.delete('/professional/' + id)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  updateProfessional(data: Professional) {
    return new Promise((resolve, reject) => {
      this._http.put('/professional/' + data._id, data)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}