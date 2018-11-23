import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SystemInfo } from './common/types';

@Injectable()
export class SystemInfoService {

  public systemInfo: SystemInfo;
  
  constructor(private _http: HttpClient) { }

  addSystemInfo(data: SystemInfo) {
    return new Promise((resolve, reject) => {
        this._http.post('/sysInfo', data)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }
  
  getSystemInfo(): Promise<SystemInfo[]> {
    return new Promise((resolve, reject) => {
      this._http.get<SystemInfo[]>('/sysInfo')
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  incrementSequence(): Promise<SystemInfo> {
    this.systemInfo.nextAccountSequence++;
    return new Promise((resolve, reject) => {
      this._http.put<SystemInfo>('/sysInfo/' + this.systemInfo._id, this.systemInfo)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
      });
    });
  }
}