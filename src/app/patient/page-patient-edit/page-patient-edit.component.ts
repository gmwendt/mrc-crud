import { AfterViewInit, Component, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";

import { Patient } from "../../core/common/types";
import { PatientService } from "../../core/patient.service";

import { DialogAlertData, DialogAlertButton } from "../../shared/dialog-alert/dialog-alert.component";
import { DialogService } from "../../shared/dialog.service";

import { Subscription } from "rxjs";

@Component({
  selector: 'page-patient-edit',
  templateUrl: './page-patient-edit.component.html',
  // styleUrls: ['./page-patient-edit.component.css']
})
export class PagePatientEditComponent implements AfterViewInit, OnDestroy {

  private _paramsDisposable: Subscription;
  private _queryParamsDisposable: Subscription;
  private _dirty: boolean;

  private isNew: boolean;
  private patient: Patient;
  private loading = true;
  
  constructor(private _route: ActivatedRoute, private _detector: ChangeDetectorRef, 
    private _patient: PatientService, private _location: Location , private _dialog: DialogService) {
  }

  ngAfterViewInit(): void {
    this._paramsDisposable = this._route.params.subscribe(async (params) => {
      var id = params['id'];
      if (!id)
        throw Error('Invalid patient');

      try {
        this.patient = await this._patient.getPatientById(id);
      }
      catch (error) {
        console.log(error);
      }
      finally {
        this.loading = false;
        this._detector.detectChanges();
      }
    });

    this._queryParamsDisposable = this._route.queryParams.subscribe(params => {
      this.isNew = params['NewPatient'] ? true : false;
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

  private async on_apply_clicked(): Promise<void> {
    if (!this.dirty)
      return;

    //TODO
  }

  private async on_cancel_clicked(): Promise<void> {
    if (this.isNew) {
      try {
        await this._patient.deletePatient(this.patient._id);
        this._location.back();
      }
      catch (error) {
        this.on_error(error["statusText"]);
      }
    }
    else  
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