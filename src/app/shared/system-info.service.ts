import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

import { SystemInfo } from '../mrc/common/types';
import { reject } from 'q';

@Injectable()
export class SystemInfoService {

  public systemInfo: SystemInfo;
  
  constructor(private _http: Http) { }

  addSystemInfo(data: SystemInfo) {
    return new Promise((resolve, reject) => {
        this._http.post('/sysInfo', data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }
  
  getSystemInfo(): Promise<SystemInfo[]> {
    return new Promise((resolve, reject) => {
      this._http.get('/sysInfo')
        .map(res => res.json())
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
      this._http.put('/sysInfo/' + this.systemInfo._id, this.systemInfo)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
      });
    });
  }
}