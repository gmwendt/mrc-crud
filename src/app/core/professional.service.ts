import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Professional, ScheduleMap } from './common/types';

@Injectable()
export class ProfessionalService {
  constructor(private _http: HttpClient) { }

  addProfessional(data: Professional) {
    return new Promise((resolve, reject) => {
      (<any>data).schedule = ScheduleMap.toJSON(data.schedule);
      this._http.post('/professional', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getAllProfessionals(): Promise<Professional[]> {
    return new Promise((resolve, reject) => {
      this._http.get<Professional[]>('/professional')
        .subscribe(res => {
          //TODO: Verificar essa gambiarra
          res.map(res => res.schedule = ScheduleMap.fromJSON(<any>res.schedule));
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getProfessionalByUserId(userId: string): Promise<Professional> {
    return new Promise((resolve, reject) => {
      this._http.get<Professional[]>('/professional/userRefId/' + userId)
        .subscribe(res => {
          if (!res || res.length == 0)
            resolve(null);
          //TODO: Verificar essa gambiarra
          res.map(res => res.schedule = ScheduleMap.fromJSON(<any>res.schedule));
          resolve(res[0]);
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
      (<any>data).schedule = ScheduleMap.toJSON(data.schedule);
      this._http.put('/professional/' + data._id, data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}