import { Component, ViewEncapsulation, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from "@angular/core";
import { Location } from '@angular/common';
import { FormControl, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from "@angular/material";

import { LaboratoryExam, FileSystemCommands, Patient, LaboratoryExamItem } from "../../core/common/types";

import { DialogAlertData, DialogAlertButton } from "../../shared/dialog-alert/dialog-alert.component";
import { DialogSelectorData, DialogSelector } from "../../shared/dialog-selector/dialog-selector.component";
import { DialogService } from "../../shared/dialog.service";

import { PatientService } from "../../core/patient.service";

import { Subscription } from "rxjs";
import * as moment from 'moment';

@Component({
  selector: 'page-lab-analysis-edit',
  templateUrl: './page-lab-analysis-edit.component.html',
  styleUrls: ['./page-lab-analysis-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PageLabAnalysisEditComponent implements AfterViewInit, OnDestroy {
  private _paramsDisposable: Subscription;
  private _queryParamsDisposable: Subscription;
  private _dirty: boolean;
  private _patient: Patient;
  private _examList: any;
  
  private dateFormControl: FormControl;
  private descriptionFormControl: FormControl;
  private examValueFormControls: FormControl[];

  private loading: boolean;
  private isNew: boolean;
  private labExam: LaboratoryExam;
  private tableSource: MatTableDataSource<LaboratoryExamItem>;
  private errorList: string[];

  constructor(private _route: ActivatedRoute, private _detector: ChangeDetectorRef, private _patientService: PatientService, 
    private _dialog: DialogService, private _location: Location) {

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

  get dirty(): boolean {
    if (!this.dateFormControl || !this.descriptionFormControl || !this.examValueFormControls)
      return false;

    if (this.dateFormControl.dirty || this.descriptionFormControl.dirty || this.examValueFormControls.some(e => e.dirty))
      return true;

    return this._dirty;
  }

  private markAsDirty(): void {
    if (this._dirty)
      return;

    this._dirty = true;
    this._detector.markForCheck();
  }

  private initializeFields(): void {
    let timestamp = this.labExam ? this.labExam.date : new Date(Date.now());
    let desc = this.labExam ? this.labExam.description : '';

    this.dateFormControl = new FormControl(moment(timestamp), Validators.required);
    this.descriptionFormControl = new FormControl(desc, Validators.required);

    this.examValueFormControls = [];
    if (this.labExam && this.labExam.exams)
      this.labExam.exams.forEach(exam => {
        let formControl = new FormControl(exam.value, Validators.required);
        this.examValueFormControls.push(formControl);
      });
  }

  private createExamTable(): void {
    if (this.labExam)
      this.tableSource = new MatTableDataSource(this.labExam.exams);
  }

  private checkErros(): boolean {
    this.errorList = [];

    if (!this.dateFormControl.valid || !this.descriptionFormControl.valid) {
      this.dateFormControl.markAsTouched();
      this.descriptionFormControl.markAsTouched();

      this.errorList.push('Todos os campos devem ser preenchidos.');
      return false;
    }
    else if (this.labExam.isResult && this.examValueFormControls.some(e => !e.valid)) {
      this.examValueFormControls.forEach(fc => fc.markAsTouched());

      this.errorList.push('Todos os campos devem ser preenchidos.');
      return false;
    }

    return true;
  }

  private async updatePatient(): Promise<void> {
    this.loading = true;

    try {
      await this._patientService.updatePatient(this._patient);
    }
    catch (error) {
      this.on_error(error);
    }
    finally {
      this.loading = false;
    }
  }

  private async on_remove_exam_click(event: MouseEvent, exam: LaboratoryExamItem): Promise<void> {
    event.stopPropagation();

    let index = this.labExam.exams.indexOf(exam);
    this.labExam.exams.splice(index, 1);
    this.createExamTable();

    this.markAsDirty();
  }

  private on_add_exams_click(): void {
    let examList = require('../../../assets/data/exams.json');

    let dialogSelectorData: DialogSelectorData = {
      columns: [{ key: 'description' }],
      source: examList,
      title: 'Solicitação de exames'
    };
    let dialogRef = this._dialog.open(DialogSelector, { data: dialogSelectorData, disableClose: true, height: '450px'});
    this.labExam.exams.forEach((exam: LaboratoryExamItem) => {
      let name = exam['description'];
      if (!dialogRef.componentInstance.data.some(i => i['description'] == name))
        dialogRef.componentInstance.data.push({
          ['description']: name
        });
      dialogRef.componentInstance.selectItem(name);
    })

    dialogRef.afterClosed().subscribe((result: LaboratoryExamItem[]) => {
      if (!result) //Cancelled
        return;

      this.labExam.exams = result;
      this.createExamTable();
      this.markAsDirty();
    });
  }

  private on_unit_change(item: LaboratoryExamItem, newFactor: number): void {
    let oldFactor = item.converterFactor ? item.converterFactor : item.availableUnits[0].converterFactor;
    let multiplier = oldFactor / newFactor;

    item.value = item.value ? item.value * multiplier : undefined;
    item.converterFactor = newFactor;
  }

  private on_fill_result_click(): void {
    this.isNew = true;
    this.labExam.isResult = true;
  }

  private on_cancel_clicked(): void {
    this._location.back();
  }

  private async on_save_clicked(): Promise<void> {
    if (!this.checkErros())
      return;

    try {
      await this.updatePatient();
    }
    finally {
      this._location.back();
    }
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

  private get tableDisplayedColumns(): string[] {
    if (!this.labExam)
      return;

    if (this.labExam.isResult)  
      return ['exam', 'value', 'commands']; 

    return ['exam', 'commands']; 
  }

  private get pageTitle(): string {
    if (!this.labExam)
      return;

    let title = this.labExam.isResult ? 'Resultado Laboratorial' : 'Requisição Laboratorial';
    return title;
  }

  private get pageSubtitle(): string {
    if (!this.labExam)
      return;

    if (this.isNew) {
      if (this.labExam.isResult)
        return 'Novo resultado';
      return 'Nova requisição'
    }
    else if (this.labExam.isResult)
      return 'Editar resultado';
    return 'Editar requisição';
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