import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, QueryList, ViewChildren, ViewEncapsulation } from "@angular/core";
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";

import { 
  AlimentarRestrictionEnum, 
  Anamneses, 
  ChewEnum,
  ClinicalEvaluation, 
  FileSystemCommands, 
  FrequencyEnum, 
  IntestinalHabitEnum, 
  LifeHabits, 
  Pathologies, 
  Patient, 
  SleepEnum,
  AppetiteEnum,
} from "../../core/common/types";
import { PatientService } from "../../core/patient.service";

import { DialogAlertButton, DialogAlertData } from "../../shared/dialog-alert/dialog-alert.component";
import { DialogService } from "../../shared/dialog.service";

import { Subscription } from "rxjs";
import { MrcInputRequiredDirective } from "../../shared/input-required.directive";

@Component({
  selector: 'page-anamneses-edit',
  templateUrl: './page-anamneses-edit.component.html',
  styleUrls: ['./page-anamneses-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PageAnamnesesEditComponent implements AfterViewInit, OnDestroy {

  private _paramsDisposable: Subscription;
  private _queryParamsDisposable: Subscription;
  private _dirty: boolean;
  private _patient: Patient
  
  private loading: boolean;
  private isNew: boolean;
  private anamnase: Anamneses;
  private errorList: string[] = [];

  private alimentarRestritionEnum = AlimentarRestrictionEnum;
  private frequencyEnum = FrequencyEnum;
  private sleepEnum = SleepEnum;
  private appetiteEnum = AppetiteEnum;
  private chewEnum = ChewEnum;
  private intestinalHabitEnum = IntestinalHabitEnum;

  @ViewChildren(MrcInputRequiredDirective) genericRequiredInputs: QueryList<MrcInputRequiredDirective>;

  constructor(private _route: ActivatedRoute, private _detector: ChangeDetectorRef, private _location: Location,
    private _patientService: PatientService, private _dialog: DialogService) {
  }

  ngAfterViewInit(): void {
    this._paramsDisposable = this._route.params.subscribe(async (params) => {
      var patientId = params['id'];
      var anamnesesId = params['anamnesesId'];

      this.loading = true;
      try {
        this.isNew = parseInt(anamnesesId) == FileSystemCommands.Add; 

        this._patient = await this._patientService.getPatientById(patientId);

        if (this.isNew)
          this.anamnase = new Anamneses(this.guid(), '', '', undefined, new LifeHabits(), new Pathologies(), new ClinicalEvaluation());
        else {
          this.anamnase = this._patient.anamneses.find(a => a.id == anamnesesId);
          if (!this.anamnase) 
            throw Error("Cound not find Anamneses content on server.");
          //else
          //  this.normalize_anamnase();
        }
      }
      catch (error) {
        this.on_error(error);
      }
      finally {
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
    this.errorList = [];

    //check generic inputs
    this.genericRequiredInputs.forEach(input => {
      if (input.showErrors)
        input.updateBorderColor();
      else
        input.showErrors = true;
  
      if (input.isNullOrEmpty)
        this.errorList.push(input.emptyError);
    });
  }

  private async on_apply_clicked(): Promise<void> {
    if (!this.dirty)
      return;

    this.checkErrors();

    if (this.errorList.length > 0)
      return;

    if (!this._patient.anamneses)
      this._patient.anamneses = [];

    if (this.isNew)
      this._patient.anamneses.push(this.anamnase);

    this.loading = true;
    try {
      await this._patientService.updatePatient(this._patient);
      this._location.back();
    }
    catch (error) {
      this.on_error(error);
    }
    finally {
      this.loading = false;
    }
  }

  private on_cancel_clicked(): void {
    this._location.back();
  }

  private show_error_dialog(msg: string): void {
    var dialogData: DialogAlertData = {
      text: msg,
      caption: 'Erro',
			button: DialogAlertButton.OK,
    };
    this._dialog.openAlert(dialogData).then(result => { });
	}

	private on_error(error: any): void {
    var msg = error["statusText"] ? error["statusText"] : error;
    console.log(error);
		this.show_error_dialog(msg);
  }

  private guidS4(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  private guid(): string {
    return this.guidS4() + this.guidS4() + '-' +
      this.guidS4() + '-' + this.guidS4() + '-' +
      this.guidS4() + '-' + this.guidS4() + this.guidS4() + this.guidS4();
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