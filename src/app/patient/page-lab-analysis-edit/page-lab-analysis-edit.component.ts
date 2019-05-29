import { Component, ViewEncapsulation, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from "@angular/material";

import { LaboratoryExam, FileSystemCommands, Patient, ILaboratoryExamItem } from "../../core/common/types";

import { DialogAlertData, DialogAlertButton } from "../../shared/dialog-alert/dialog-alert.component";
import { DialogSelectorData, DialogSelector } from "../../shared/dialog-selector/dialog-selector.component";
import { DialogService } from "../../shared/dialog.service";

import { LabExamItemKey, LabExamsItems } from "../../core/common/constants";
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

  private loading: boolean;
  private isNew: boolean;
  private labExam: LaboratoryExam;
  private tableSource: MatTableDataSource<ILaboratoryExamItem>;

  constructor(private _route: ActivatedRoute, private _detector: ChangeDetectorRef, private _patientService: PatientService, 
    private _dialog: DialogService) {

  }

  ngAfterViewInit() {

    this._examList = require('../../../assets/data/exams.json'); /*
      TODO: 
      importing OK, move to inside the function that consume this json and use let
    */
    
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
  }

  private createExamTable(): void {
    if (this.labExam)
      this.tableSource = new MatTableDataSource(this.labExam.exams);
  }

  private async on_remove_exam_click(event: MouseEvent, exam: ILaboratoryExamItem): Promise<void> {
    event.stopPropagation();

    let index = this.labExam.exams.indexOf(exam);
    this.labExam.exams.splice(index, 1);
    this.createExamTable();

    this.markAsDirty();
  }

  private on_add_exams_click(): void {
    let dialogSelectorData: DialogSelectorData = {
      columns: [{ key: 'desciption' }],
      source: LabExamsItems,
      title: 'Solicitação de exames'
    };
    let dialogRef = this._dialog.open(DialogSelector, { data: dialogSelectorData, disableClose: true, height: '450px'});
    this.labExam.exams.forEach((exam: ILaboratoryExamItem) => {
      let name = exam[LabExamItemKey];
      if (!dialogRef.componentInstance.data.some(i => i[LabExamItemKey] == name))
        dialogRef.componentInstance.data.push({
          [LabExamItemKey]: name
        });
      dialogRef.componentInstance.selectItem(name);
    })

    dialogRef.afterClosed().subscribe((result: ILaboratoryExamItem[]) => {
      if (!result) //Cancelled
        return;

      this.labExam.exams = result;
      this.createExamTable();
      this.markAsDirty();
    });
  }

  private on_fill_result_click(): void {
    this.isNew = true;
    this.labExam.isResult = true;
  }

  private on_cancel_clicked(): void {
    debugger;
    //todo
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