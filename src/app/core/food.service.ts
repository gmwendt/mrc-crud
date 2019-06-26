import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IFoodDetail, IFoodMeasurement } from './common/types';

@Injectable()
export class FoodService {
  constructor(private _http: HttpClient) { }

  getTacoList(): Promise<IFoodDetail[]> {
    return new Promise((resolve, reject) => {
      this._http.get<IFoodDetail[]>('/food/').subscribe(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  tacoFilter(search: string, properties: string[]): Promise<IFoodDetail[]> {
    let reqProp = '';
    properties.forEach(p => {
      reqProp += p + ';';
    });

    return new Promise((resolve, reject) => {
      this._http.get<IFoodDetail[]>('/food/filter/' + search + '/req/' + reqProp).subscribe(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  getFoodById(id: number): Promise<IFoodDetail> {
    return new Promise((resolve, reject) => {
      this._http.get<IFoodDetail[]>('/food/id/' + id).subscribe(res => {
        if (res && res.length > 0)
          resolve(res[0]);
        else
          resolve(null);
      }, err => reject(err));
    });
  }
}