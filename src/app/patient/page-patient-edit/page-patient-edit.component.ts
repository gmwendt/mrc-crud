import { Component, ViewEncapsulation, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Patient, FileSystemCommands } from '../../core/common/types';
import { PatientService } from '../../core/patient.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'page-patient-edit',
  templateUrl: './page-patient-edit.component.html',
  styleUrls: ['./page-patient-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PagePatientEdit implements AfterViewInit, OnDestroy {

  private loading: boolean = true;
  private isNew: boolean;
  private patient: Patient;
  private errorList: string[] = [];

  private _paramsDisposable: Subscription;
  private _dirty: boolean;

  constructor(private _route: ActivatedRoute, private _detector: ChangeDetectorRef, private _patientService: PatientService) {

  }

  ngAfterViewInit() {
    this._paramsDisposable = this._route.params.subscribe(async (params) => {
      var patientId = params['id'];
      var isNew = parseInt(patientId) == FileSystemCommands.Add; 

      try {
        await this.loadPatient(patientId, isNew);
      }
      catch (error) {

      }
      finally {
        this.loading = false;
        this.isNew = isNew;
      }
    });

  }

  get dirty(): boolean {
    return this._dirty;
  }

  private markAsDirty(): void {
    if (this._dirty)
      return;

    this._dirty = true;
    this._detector.markForCheck();
  }

  private async on_apply_clicked(): Promise<void> {
    if (!this.dirty)
      return;
  }

  private async on_cancel_clicked(): Promise<void> {
  }

  private async loadPatient(patientId: string, isNew: boolean): Promise<void> {
    if (isNew) {
      this._dirty = true;
      //TODO
    }
    else
      this.patient = await this._patientService.getPatientById(patientId);
  }

  ngOnDestroy(): void {
    if (this._paramsDisposable != null) {
      this._paramsDisposable.unsubscribe();
      this._paramsDisposable = null;
    }
  }
}