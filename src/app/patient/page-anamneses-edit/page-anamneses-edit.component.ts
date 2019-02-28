import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, QueryList, ViewChildren, ViewEncapsulation } from "@angular/core";
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";

import { FecesFormat, PoopShadeList, IPoopShadeOption } from "../../core/common/constants";

import { 
  AlimentarRestrictionEnum, 
  Anamneses, 
  AppetiteEnum,
  ChewEnum,
  ClinicalEvaluation, 
  FecesFormatEnum,
  FileSystemCommands, 
  FrequencyEnum, 
  IntestinalHabitEnum, 
  LifeHabits, 
  Pathologies, 
  Patient, 
  PoopShadesEnum,
  SleepEnum,
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
  private poopShadeList = PoopShadeList;

  private alimentarRestritionEnum = AlimentarRestrictionEnum;
  private frequencyEnum = FrequencyEnum;
  private sleepEnum = SleepEnum;
  private appetiteEnum = AppetiteEnum;
  private chewEnum = ChewEnum;
  private intestinalHabitEnum = IntestinalHabitEnum;
  private fecesFormat = FecesFormatEnum;
  private poopShadesEnum = PoopShadesEnum;

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
          else
            this.normalizeAnamnase();
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

  private get bristolIndicator(): string {
    if (!this.anamnase || !this.anamnase.clinicalEvaluation)
      return;

    switch (this.anamnase.clinicalEvaluation.fecesFormat) {
      case FecesFormatEnum.Type1:
        return 'Constipação';
      case FecesFormatEnum.Type2:
        return 'Constipação';
      case FecesFormatEnum.Type3:
        return 'Bom';
      case FecesFormatEnum.Type4:
        return 'Ótimo';
      case FecesFormatEnum.Type5:
        return 'Tendência a diarréia';
      case FecesFormatEnum.Type6:
        return 'Diarréia leve';
      case FecesFormatEnum.Type7:
        return 'Diarréia';
      default:
        return null;
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

  private normalizeAnamnase(): void {
    if (!this.anamnase.lifeHabits)
      this.anamnase.lifeHabits = new LifeHabits();

    if (!this.anamnase.pathologies)
      this.anamnase.pathologies = new Pathologies();

    if (!this.anamnase.clinicalEvaluation)
      this.anamnase.clinicalEvaluation = new ClinicalEvaluation();

    if (typeof(this.anamnase.clinicalEvaluation.poopShade) === "number" ||
        typeof(this.anamnase.clinicalEvaluation.poopShade) === "string")
      this.poopShadeList.forEach(p => {
        if (p.value == this.anamnase.clinicalEvaluation.poopShade)
          p.selected = true;
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

  private on_mrc_chip_option_clicked(option: IPoopShadeOption): void {
    if (option.selected)
      return;

    this.poopShadeList.forEach(p => p.selected = false);

    option.selected = true;
    this.anamnase.clinicalEvaluation.poopShade = option.value;

    this.markAsDirty();
  }

  private getFecesFormatText(type:FecesFormatEnum): string {
    switch (type) {
      case FecesFormatEnum.Type1:
        return FecesFormat.Type1;
      case FecesFormatEnum.Type2:
        return FecesFormat.Type2;
      case FecesFormatEnum.Type3:
        return FecesFormat.Type3;
      case FecesFormatEnum.Type4:
        return FecesFormat.Type4;
      case FecesFormatEnum.Type5:
        return FecesFormat.Type5;
      case FecesFormatEnum.Type6:
        return FecesFormat.Type6;
      case FecesFormatEnum.Type7:
        return FecesFormat.Type7;
    }
  }

  private getFecesFormatImage(type: FecesFormatEnum): string {
    switch (type) {
      case FecesFormatEnum.Type1:
        return '../../../assets/images/bristol/type1.png';
      case FecesFormatEnum.Type2:
        return '../../../assets/images/bristol/type2.png';
      case FecesFormatEnum.Type3:
        return '../../../assets/images/bristol/type3.png';
      case FecesFormatEnum.Type4:
        return '../../../assets/images/bristol/type4.png';
      case FecesFormatEnum.Type5:
        return '../../../assets/images/bristol/type5.png';
      case FecesFormatEnum.Type6:
        return '../../../assets/images/bristol/type6.png';
      case FecesFormatEnum.Type7:
        return '../../../assets/images/bristol/type7.png';
      default:
        return ''; //todo: no-image
    }
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