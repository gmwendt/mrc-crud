import { AfterViewInit, Component, ChangeDetectorRef, OnDestroy, ViewEncapsulation, ElementRef, HostListener } from "@angular/core";
import { Location } from '@angular/common';
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";

import { CorporalDensityProtocols } from "../../core/common/constants";
import { Anamneses, FileSystemCommands, Patient, Measurements, IHistoricalValue, LaboratoryExamItem, LaboratoryExam, FoodPlan, EnergyExpend } from "../../core/common/types";
import { Equations } from "../../core/common/worker";
import { PatientService } from "../../core/patient.service";

import { DialogAlertData, DialogAlertButton, DialogAlertResult } from "../../shared/dialog-alert/dialog-alert.component";
import { DialogSelector, DialogSelectorColumn, DialogSelectorData } from "../../shared/dialog-selector/dialog-selector.component";
import { DialogService } from "../../shared/dialog.service";

import { Subscription } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

import * as moment from 'moment';

export enum BodyCompositionTypeEnum {
  Bioimpedance, 
  Skinfolds
}

@Component({
  selector: 'page-patient-consult',
  templateUrl: './page-patient-consult.component.html',
  styleUrls: ['./page-patient-consult.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PagePatientConsultComponent implements AfterViewInit, OnDestroy {

  private _routeAnamneses: string = 'anamneses';
  private _routeFoodPlan: string = 'planoAlimentar';
  private _routeLabAnalyse: string = 'analiseLaboratorial';
  private _routeEnergyExpend: string = 'gastoEnergetico';
  private _dirty: boolean;
  private _paramsDisposable: Subscription;
  
  private anamneses: MatTableDataSource<Anamneses>;
  private examsReq: MatTableDataSource<LaboratoryExam>;
  private examsRes: MatTableDataSource<LaboratoryExam>;
  private foodRecalls: MatTableDataSource<FoodPlan>;
  private energyExpends: MatTableDataSource<EnergyExpend>;
  private anamnesesDisplayedColumns = ['clinicCase', 'commands'];
  private examsRequestedDisplayedColumns = ['description', 'timeElapsed', 'commands'];
  private foodPlansDisplayedColumns = ['description', 'timeElapsed', 'commands'];
  private energyExpendsDisplayedColumns = ['description', 'commands']; //TODO: 'timeElapsed', 

  private loading = true;
  private patient: Patient;
  private selectedTabIndex: number = 2;
  private bodyCompositionTypeValue: BodyCompositionTypeEnum;

  private bodyCompositionType = BodyCompositionTypeEnum;
  private equations = Equations;
  private protocols = CorporalDensityProtocols;
  
  constructor(private _element: ElementRef, private _route: ActivatedRoute, private _detector: ChangeDetectorRef, private _router: Router,
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
        this.createExamsTables();
        this.createFoodRecallTable();
        this.createEnergyExpendsTable();
      }
      catch (error) {
        this.on_error(error);
      }
      finally {
        this.normalizeMeasurements();
        this.definyBodyCompositionType();
          
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
    //TODO ??
  }

  private on_anamneses_edit(anamnesesId?: string): void {
    var id = anamnesesId ? anamnesesId : FileSystemCommands.Add;
    this.navigate(this._routeAnamneses, id);
  }

  private on_exam_request_click(labAnalyseId?: string): void {
    let examList = require('../../../assets/data/exams.json'); 
    let columnKey = 'description';
    
    let dialogSelectorData: DialogSelectorData = {
      columns: [{ key: columnKey }],
      source: examList,
      title: 'Requisição de exames'
    };
    let dialogRef = this._dialog.open(DialogSelector, { data: dialogSelectorData, disableClose: true, height: '485px'});

    dialogRef.afterClosed().subscribe((result: LaboratoryExamItem[]) => {
      if (!result || result.length == 0)
        return;
      
      if (!this.patient.exams)
        this.patient.exams = [];
      let examName = 'Requisição ' + (this.patient.exams.length + 1);
      let exam = new LaboratoryExam(this.guid(), examName, new Date(Date.now()).toISOString(), false, result);

      this.patient.exams.push(exam);
      this.updatePatient().then(() => this.createExamsTables());
    });
  }

  private on_exam_edit(examId?: string): void {
    var id = examId ? examId : FileSystemCommands.Add;
    this.navigate(this._routeLabAnalyse, id);
  }

  private on_food_plan_edit(isRecall?: boolean, foodPlanId?: string): void {
    var id = foodPlanId ? foodPlanId : (isRecall ? FileSystemCommands.AddType1 : FileSystemCommands.AddType2);
    this.navigate(this._routeFoodPlan, id);
  }

  private on_energy_expend_edit(getId?: string): void {
    var id = getId ? getId : FileSystemCommands.Add;
    this.navigate(this._routeEnergyExpend, id);
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

    this.patient.anamneses.splice(index, 1);
    await this.updatePatient();
    this.createAnamnasesTable();
  }

  private async on_remove_exam_click(event: MouseEvent, exam: LaboratoryExam): Promise<void> {
    event.stopPropagation();

    let text = 'Deseja remover ' + exam.description;
    var dialogData: DialogAlertData = {
			text: text,
			button: DialogAlertButton.YesNo,
			textAlign: 'center',
    }

    var dialogResult = await this._dialog.openAlert(dialogData);
    if (dialogResult == DialogAlertResult.No)
      return;

    this.loading = true;
    var index = this.patient.exams.indexOf(exam);

    this.patient.exams.splice(index, 1);
    await this.updatePatient();
    this.createExamsTables();
  }

  private async on_remove_foodplan_click(event: MouseEvent, foodPlan: FoodPlan): Promise<void> {
    event.stopPropagation();

    var dialogData: DialogAlertData = {
			text: 'Deseja remover este Recordatório Alimentar?',
			button: DialogAlertButton.YesNo,
			textAlign: 'center',
    }
    
    var dialogResult = await this._dialog.openAlert(dialogData);
    if (dialogResult == DialogAlertResult.No)
      return;

    var index = this.patient.foodPlans.indexOf(foodPlan);

    this.patient.foodPlans.splice(index, 1);
    await this.updatePatient();
    this.createFoodRecallTable();
  }

  private async on_measurement_edited(histValue?: IHistoricalValue): Promise<void> {
    await this.updatePatient();
  }

  private async updatePatient(): Promise<void> {
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

  private createExamsTables(): void {
    if (this.patient && this.patient.exams) {
      this.examsReq = new MatTableDataSource(this.patient.exams.filter(e => !e.isResult));
      this.examsRes = new MatTableDataSource(this.patient.exams.filter(e => e.isResult));
    }
  }

  private createFoodRecallTable(): void {
    if (!this.patient || !this.patient.foodPlans)
      return;

    this.patient.foodPlans.sort((a, b) => {
      return (a.date > b.date) ? -1 : ((a.date < b.date) ? 1: 0);
    });
    
    this.foodRecalls = new MatTableDataSource(this.patient.foodPlans.filter(plan => plan.isRecall));
  }

  private createEnergyExpendsTable(): void {
    if (!this.patient || !this.patient.energyExpend)
      return;

    this.energyExpends = new MatTableDataSource(this.patient.energyExpend);
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

  private definyBodyCompositionType(): void {
    if (this.patient.measurements.imc && this.patient.measurements.imc.length > 0) //TODO others
      this.bodyCompositionTypeValue = BodyCompositionTypeEnum.Bioimpedance;
    else
      this.bodyCompositionTypeValue = BodyCompositionTypeEnum.Skinfolds;
  }

  private getTimeElapsed(time: string): string {
    if (!time)
      return;

    let elapsed = moment.duration(moment().diff(time));
    
    if (elapsed.asSeconds() < 60)
      return `há ${Math.round(elapsed.asSeconds())} segundos.`;
    else if (elapsed.asMinutes() < 60)
      return `há ${Math.round(elapsed.asMinutes())} minutos.`;
    else if (elapsed.asHours() < 24)
      return `há ${Math.round(elapsed.asHours())} horas.`;
    else if (elapsed.asDays() < 31)
      return `há ${Math.round(elapsed.asDays())} dias.`;
    else if (elapsed.asMonths() < 12)
      return `há ${Math.round(elapsed.asMonths())} meses.`;
    else// if (elapsed.asYears() < 60)
      return `há ${Math.round(elapsed.asYears())} anos.`;
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

    let value = data.value;
    if (typeof value === 'number' && !isNaN(value)) 
      value = value.toLocaleString();
  
    return value + ' ' + data.unit;
  }

  private get examTableHeight(): string {
    if (!this._element)
      return;

    return (this._element.nativeElement.clientHeight - 266) / 2 + 'px';
  }

  private get_predictive_value(equation: string, unit: string): IHistoricalValue[] {
    //TODO
    if (!this.patient || !this.patient.measurements)
      return;

    return Equations.calculate(equation, unit, this.patient.measurements);
  }

	private on_error(error: any): void {
    console.log(error);
		this.show_error_dialog(error);
  }

  private get browserLocale(): string {
    return navigator.language || (<any>navigator).userLanguage;
  }

  private guid(): string {
    return this.guidS4() + this.guidS4() + '-' +
      this.guidS4() + '-' + this.guidS4() + '-' +
      this.guidS4() + '-' + this.guidS4() + this.guidS4() + this.guidS4();
  }

  private guidS4(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  
  ngOnDestroy(): void {
    if (this._paramsDisposable != null) {
      this._paramsDisposable.unsubscribe();
      this._paramsDisposable = null;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this._detector.detectChanges();
  }
}