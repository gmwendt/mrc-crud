import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { AddressInfo } from "./common/types";

export interface cepJSON {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  unidade: string;
  erro: string;
}

@Injectable()
export class ZipcodeService {
  constructor(private _http: HttpClient) { }

  getAddressInfo(zipcode: string): Promise<AddressInfo> {
    return new Promise((resolve, reject) => {
      this._http.get(`https://viacep.com.br/ws/${zipcode}/json/`)
        .subscribe((res: cepJSON) => {
          if (res.erro)
            resolve(null);
            
          var address = new AddressInfo(zipcode, res.logradouro, '', res.bairro, res.localidade, res.uf);
          resolve(address);
        }, err => reject(err));
    });
  }
}