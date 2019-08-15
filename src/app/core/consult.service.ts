import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConsultEvent } from './common/types';

@Injectable()
export class ConsultService {
  constructor(private _http: HttpClient) { }

  addConsult(data: ConsultEvent): Promise<ConsultEvent> {
    return new Promise((resolve, reject) => {
      this._http.post<ConsultEvent>('/consult', data)
        .subscribe(res => resolve(res),
          err => reject(err)
        );
    });
  }

  getAllConsults(): Promise<ConsultEvent[]> {
    return new Promise((resolve, reject) => {
      this._http.get<ConsultEvent[]>('/consult')
        .subscribe(res => resolve(res), err => reject(err));
    });
  }

  getConsultById(id: string): Promise<ConsultEvent> {
    return new Promise((resolve, reject) => {
      this._http.get<ConsultEvent>('/consult/' + id)
        .subscribe(res => resolve(res), err => reject(err));
    });
  }

  updateConsult(data: ConsultEvent): Promise<ConsultEvent> {
    return new Promise((resolve, reject) => {
      this._http.put<ConsultEvent>('/consult/' + data.id, data)
        .subscribe(res => resolve(res), err => reject(err));
    });
  }

  deleteConsult(id: string): Promise<ConsultEvent> {
    return new Promise((resolve, reject) => {
      this._http.delete<ConsultEvent>('/consult/' + id)
        .subscribe(res => resolve(res), err => reject(err));
    });
  }
}