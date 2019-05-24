import { Component, ViewEncapsulation, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

import { LaboratoryExam, FileSystemCommands, Patient, ILaboratoryExamItem } from "../../core/common/types";

import { DialogAlertData, DialogAlertButton } from "../../shared/dialog-alert/dialog-alert.component";
import { DialogService } from "../../shared/dialog.service";
import { PatientService } from "../../core/patient.service";

import { Subscription } from "rxjs";
import * as moment from 'moment';
import { MatTableDataSource } from "@angular/material";

@Component({
  selector: 'page-lab-analysis-edit',
  templateUrl: './page-lab-analysis-edit.component.html',
  // styleUrls: ['./page-lab-analysis-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PageLabAnalysisEditComponent implements AfterViewInit, OnDestroy {
  private _paramsDisposable: Subscription;
  private _queryParamsDisposable: Subscription;
  private _patient: Patient
  
  private dateFormControl: FormControl;
  private descriptionFormControl: FormControl;

  private loading: boolean;
  private isNew: boolean;
  private labExam: LaboratoryExam;
  private tableSource: MatTableDataSource<ILaboratoryExamItem>;
  private tableDisplayedColumns = ['exam', 'commands'];

  constructor(private _route: ActivatedRoute, private _detector: ChangeDetectorRef, private _patientService: PatientService, 
    private _dialog: DialogService) {

  }

  ngAfterViewInit() {
    this._paramsDisposable = this._route.params.subscribe(async (params) => {
      var patientId = params['id'];
      var labAnalyseId = params['labAnalyseId'];
      this.loading = true;

      try {
        await this.loadLabExam(patientId, labAnalyseId);
      }
      catch (error) {
        this.on_error(error);
      }
      finally {
        this.initializeFields();
        this.createExamTable();

        this.loading = false;
        this._detector.detectChanges();
      }
    });
  }

  private async loadLabExam(patientId: string, labAnalyseId: string): Promise<void> {
    this.isNew = parseInt(labAnalyseId) == FileSystemCommands.Add; 
    this._patient = await this._patientService.getPatientById(patientId);

    if (this.isNew) {
      //TODO
    }
    else {
      this.labExam = this._patient.exams.find(a => a.id == labAnalyseId);
      if (!this.labExam) 
        throw Error("Cound not find LabAnalyse content on server.");
      //TODO: verify if need normalize
      // else
      //   this.normalizeAnamnase();
    }
  }

  private initializeFields(): void {
    let timestamp = this.labExam ? this.labExam.date : new Date(Date.now());
    let desc = this.labExam ? this.labExam.description : '';

    this.dateFormControl = new FormControl(moment(timestamp), Validators.required);
    this.descriptionFormControl = new FormControl(desc, Validators.required);
  }

  private createExamTable(): void {
    if (this.labExam)
      this.tableSource = new MatTableDataSource(this.labExam.examsRequested);
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

	private on_error(error: any): void {
    console.log(error);
		this.show_error_dialog(error);
  }

  ngOnDestroy(): void {
    if (this._paramsDisposable != null) {
      this._paramsDisposable.unsubscribe();
      this._paramsDisposable = null;
    }
    if (this._queryParamsDisposable != null) {
      this._queryParamsDisposable.unsubscribe();
      this._queryParamsDisposable = null;
    }
  }
}