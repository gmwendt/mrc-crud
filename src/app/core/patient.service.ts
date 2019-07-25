import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AddressInfo, Patient, Anamneses, Measurements, LaboratoryExam, FoodPlan, EnergyExpend } from './common/types';

@Injectable()
export class PatientService {
  constructor(private _http: HttpClient) { }

  addPatient(data: Patient): Promise<Patient> {
    return new Promise((resolve, reject) => {
      let obj = this.normalizeToJSON(data);

      this._http.post<Patient>('/patient', obj)
        .subscribe(res => {
          let normalized = this.normalizeFromJSON(res);
          normalized = Patient.fromJSON(normalized);
          resolve(normalized);
        }, (err) => {
          reject(err);
        });
    });
  }

  getAllPatients(): Promise<Patient[]> {
    return new Promise((resolve, reject) => {
      this._http.get<Patient[]>('/patient')
        .subscribe(res => {
          res.map(res => {
            res.address = res.address ? AddressInfo.fromJSON(res.address) : null;
            res.measurements = res.measurements ? Measurements.fromJSON(res.measurements) : null;
            res.anamneses = res.anamneses ? JSON.parse(<any>res.anamneses).map(a => Anamneses.fromJSON(a)) : undefined;
            res.exams = res.exams ? JSON.parse(<any>res.exams).map(a => LaboratoryExam.fromJSON(a)) : undefined;
            res.foodPlans = res.foodPlans ? JSON.parse(<any>res.foodPlans).map(e => FoodPlan.fromJSON(e)) : undefined;
            res.energyExpend = res.energyExpend ? JSON.parse(<any>res.energyExpend).map(e => EnergyExpend.fromJSON(e)) : undefined;
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
          let normalized = this.normalizeFromJSON(res);
          normalized = Patient.fromJSON(normalized);
          resolve(normalized);
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
    return new Promise((resolve, reject) => {
      let obj = this.normalizeToJSON(data);
      this._http.put<Patient>('/patient/' + data._id, obj)
        .subscribe(res => {
          let normalized = this.normalizeFromJSON(res);
          resolve(normalized);
        }, (err) => {
          reject(err);
        });
    });
  }

  private normalizeToJSON(patient: Patient): Patient {
    let obj: Patient = this.clone(patient);

    (<any>obj).address = patient.address ? patient.address.toJSON() : '';
    (<any>obj).anamneses = patient.anamneses ? JSON.stringify(patient.anamneses.map(a => a.toJSON())) : undefined;
    (<any>obj).measurements = patient.measurements ? patient.measurements.toJSON() : undefined;
    (<any>obj).exams = patient.exams ? JSON.stringify(patient.exams.map(e => e.toJSON())) : undefined;
    (<any>obj).foodPlans = patient.foodPlans ? JSON.stringify(patient.foodPlans.map(e => e.toJSON())) : undefined;
    (<any>obj).energyExpend = patient.energyExpend ? JSON.stringify(patient.energyExpend.map(e => e.toJSON())) : undefined;
    
    return obj;
  }

  private normalizeFromJSON(patient: Patient): Patient {
    patient.address = patient.address ? AddressInfo.fromJSON(patient.address) : null;
    patient.anamneses = patient.anamneses ? JSON.parse(<any>patient.anamneses).map(a => Anamneses.fromJSON(a)) : undefined;
    patient.measurements = patient.measurements ? Measurements.fromJSON(patient.measurements) : null;
    patient.exams = patient.exams ? JSON.parse(<any>patient.exams).map(e => LaboratoryExam.fromJSON(e)) : undefined;
    patient.foodPlans = patient.foodPlans ? JSON.parse(<any>patient.foodPlans).map(e => FoodPlan.fromJSON(e)) : undefined;
    patient.energyExpend = patient.energyExpend ? JSON.parse(<any>patient.energyExpend).map(e => EnergyExpend.fromJSON(e)) : undefined;

    return patient;
  }

  private clone(data: Patient): Patient {
    return Object.assign({}, data);
  }
}