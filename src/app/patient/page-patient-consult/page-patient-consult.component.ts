import { AfterViewInit, Component, ChangeDetectorRef, OnDestroy, ViewEncapsulation } from "@angular/core";
import { Location } from '@angular/common';
import { MatTableDataSource } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";

import { Anamneses, FileSystemCommands, Patient, Measurements, IHistoricalValue } from "../../core/common/types";
import { PatientService } from "../../core/patient.service";

import { DialogAlertData, DialogAlertButton, DialogAlertResult } from "../../shared/dialog-alert/dialog-alert.component";
import { DialogService } from "../../shared/dialog.service";

import { Subscription } from "rxjs";
import { DialogHistoricalValueEditComponent, DialogHistoricalValueEditData } from "app/shared/dialog-historical-value-edit/dialog-historical-value-edit.component";
import { HttpErrorResponse } from "@angular/common/http";

import * as moment from 'moment';

@Component({
  selector: 'page-patient-consult',
  templateUrl: './page-patient-consult.component.html',
  styleUrls: ['./page-patient-consult.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PagePatientConsultComponent implements AfterViewInit, OnDestroy {

  private _anamnesesRoute: string = 'anamneses';
  private _dirty: boolean;
  private _paramsDisposable: Subscription;
  
  private anamneses: MatTableDataSource<Anamneses>;
  private displayedColumns = ['clinicCase', 'commands'];
  private loading = true;
  private patient: Patient;
  private selectedTabIndex: number = 2;
  
  constructor(private _route: ActivatedRoute, private _detector: ChangeDetectorRef, private _router: Router,
    private _patient: PatientService, private _location: Location , private _dialog: DialogService) {
  }

  ngAfterViewInit(): void {
    this._paramsDisposable = this._route.params.subscribe(async (params) => {
      var id = params['id'];
      if (!id)
        throw Error('Invalid patient');

      try {
        this.patient = await this._patient.getPatientById(id);
        this.createAnamnasesTable();
      }
      catch (error) {
        this.on_error(error);
      }
      finally {
        this.normalizeMeasurements();
          
        this.selectedTabIndex = 0;
        this.loading = false;
        this._detector.detectChanges();
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

  private checkErrors(): void {
    //TODO
  }

  private on_anamneses_edit(anamnesesId?: string): void {
    var id = anamnesesId ? anamnesesId : FileSystemCommands.Add;
    this.navigate(this._anamnesesRoute, id);
  }

  private async on_remove_anamneses_click(event: MouseEvent, anamnese: Anamneses): Promise<void> {
    event.stopPropagation();

    var dialogData: DialogAlertData = {
			text: 'Deseja remover este registro de Anamneses?',
			button: DialogAlertButton.YesNo,
			textAlign: 'center',
    }
    
    var dialogResult = await this._dialog.openAlert(dialogData);
    if (dialogResult == DialogAlertResult.No)
      return;

    this.loading = true;
    var index = this.patient.anamneses.indexOf(anamnese);

    try {
      this.patient.anamneses.splice(index, 1);
      await this._patient.updatePatient(this.patient);
      this.createAnamnasesTable();
    }
    catch (error) {
      this.on_error(error);
    }
    finally {
      this.loading = false;
    }
  }

  private async on_measurement_edited(histValue?: IHistoricalValue): Promise<void> {
    this.loading = true;

    try {
      await this._patient.updatePatient(this.patient);
    }
    catch (error) {
      this.on_error(error);
    }
    finally {
      this.loading = false;
    }
  }

  private createAnamnasesTable(): void {
    if (this.patient)
		  this.anamneses = new MatTableDataSource(this.patient.anamneses);
  }

  private navigate(route: string, id: string | FileSystemCommands, queryParams?: Object): void {
    this._router.navigate([route, id], { relativeTo: this._route, queryParams: queryParams });
  }

  private normalizeMeasurements(): void {
    if (this.patient && !this.patient.measurements) 
      this.patient.measurements = new Measurements();
    else
      this.patient.measurements = Measurements.normalize(this.patient.measurements);
  }

  private show_error_dialog(error: any): void {
    var msg = error instanceof HttpErrorResponse ? error["message"] : error;

    var dialogData: DialogAlertData = {
      text: msg,
      caption: 'Erro',
			button: DialogAlertButton.OK,
    };
    this._dialog.openAlert(dialogData).then(result => { });
  }

  private format_value(data: IHistoricalValue | string): string {
    if (!data)
      return;

    if (typeof data === 'string')
      return data;

    return data.value + ' ' + data.unit;
  }

	private on_error(error: any): void {
    console.log(error);
		this.show_error_dialog(error);
  }

  private get browserLocale(): string {
    return navigator.language || (<any>navigator).userLanguage;
  }
  
  ngOnDestroy(): void {
    if (this._paramsDisposable != null) {
      this._paramsDisposable.unsubscribe();
      this._paramsDisposable = null;
    }
  }
}