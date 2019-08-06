import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserConfigurations, ProfessionalService } from './common/types';

@Injectable()
export class UserConfigurationsService {
  constructor(private _http: HttpClient) { }

  addAdminItem(data: UserConfigurations): Promise<UserConfigurations> {
    return new Promise((resolve, reject) => {
      let obj = this.normalizeToJSON(data);

      this._http.post<UserConfigurations>('/userConfigurations', obj)
        .subscribe(res => {
          let normalized = this.normalizeFromJSON(res);
          resolve(normalized);
        }, (err) => {
          reject(err);
        });
    });
  }

  getUserConfigs(): Promise<UserConfigurations[]> {
    return new Promise((resolve, reject) => {
      this._http.get<UserConfigurations[]>('/userConfigurations')
        .subscribe(res => {
          res.map(res => {
            res.services = res.services ? JSON.parse(<any>res.services).map(s => ProfessionalService.fromJSON(s)) : undefined;
          });
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  updateUserConfigs(data: UserConfigurations): Promise<UserConfigurations> {
    return new Promise((resolve, reject) => {
      let obj = this.normalizeToJSON(data);
      this._http.put<UserConfigurations>('/userConfigurations/' + data.id, obj)
        .subscribe(res => {
          let normalized = this.normalizeFromJSON(res);
          resolve(normalized);
        }, (err) => {
          reject(err);
        });
    });
  }

  private normalizeToJSON(userConfig: UserConfigurations): UserConfigurations {
    let obj: UserConfigurations = this.clone(userConfig);

    (<any>obj).services = userConfig.services ? JSON.stringify(userConfig.services.map(s => s.toJSON())) : undefined;

    return obj;
  }

  private normalizeFromJSON(userConfig: UserConfigurations): UserConfigurations {
    userConfig.services = userConfig.services ? JSON.parse(<any>userConfig.services).map(s => ProfessionalService.fromJSON(s)) : undefined;

    return userConfig;
  }

  private clone(data: UserConfigurations): UserConfigurations {
    return Object.assign({}, data);
  }
}