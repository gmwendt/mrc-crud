import { Component, ViewEncapsulation, Inject, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { SeriesColors } from '../../core/common/constants';
import { Util } from '../../core/common/helper';
import { ConsultEvent, ProfessionalService, UserConfigurations } from '../../core/common/types';
import { ConsultService } from '../../core/consult.service';
import { UserConfigurationsService } from '../../core/user-configurations.service';

import { DialogAlertButton, DialogAlertData } from '../../shared/dialog-alert/dialog-alert.component';
import { DialogService } from '../../shared/dialog.service';

import * as dateFns from 'date-fns';

export interface DialogCalendarEventData {
  eventId: string;
  start?: Date;
}

@Component({
  selector: 'dialog-calendar-event-edit',
  templateUrl: './dialog-calendar-event-edit.component.html',
  styleUrls: ['./dialog-calendar-event-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DialogCalendarEventEdit implements AfterViewInit {
  
  private _loading: boolean;
  private _data: DialogCalendarEventData;

  //** Controls */
  private titleCtrl: FormControl;
  private startTimeCtrl: FormControl;
  private endTimeCtrl: FormControl;
  private serviceCtrl: FormControl;

  private isNew: boolean;
  private errorList: string[];
  private saveTouched: boolean;
  private servicesList: ProfessionalService[];
  private event: ConsultEvent;

  constructor(private _dialogRef: MatDialogRef<DialogCalendarEventEdit>, @Inject(MAT_DIALOG_DATA) data: DialogCalendarEventData,
    private _detector: ChangeDetectorRef, private _dialog: DialogService, private _userConfigs: UserConfigurationsService,
    private _consultService: ConsultService) {
    this._data = data;
  }

  async ngAfterViewInit() {
    this.loading = true;

    try {
      await this.load_event(this._data.eventId, this._data.start);
    }
    catch (error) {
      this.on_error(error);
    }
    finally {
      this.initializeControls();

      this.loading = false;
    }
  }

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    if (value == this._loading)
      return;

    this._loading = value;
    this._detector.detectChanges();
  }

  get dirty(): boolean {
    if (!this.titleCtrl || !this.startTimeCtrl || !this.endTimeCtrl || !this.serviceCtrl)
      return false;

    if (this.titleCtrl.dirty || this.startTimeCtrl.dirty || this.endTimeCtrl.dirty || this.serviceCtrl.dirty)
      return true;
    
    return false;
  }

  private async load_event(eventId: string, start: Date): Promise<void> {
    this.isNew = Util.isNullOrEmpty(eventId);
    let configs = await this._userConfigs.getUserConfigs();
    
    if (!configs || configs.length == 0) {
      configs = [];
      configs[0] = await this.generateInitalConfigs();
    }
    
    this.servicesList = configs[0].services;

    if (this.isNew)
      this.event = new ConsultEvent('', start.toISOString(), this.calculateEndTime(start, this.servicesList[0]).toISOString(),
        this.servicesList[0].price, this.servicesList[0].id, null);
    else {
      // TODO
    }
  }

  private async generateInitalConfigs(): Promise<UserConfigurations> {
    let services: ProfessionalService[] = [];
    services.push(new ProfessionalService('__fixed__' + Util.guid(), 'Consulta', SeriesColors[0]));
    services.push(new ProfessionalService(Util.guid(), 'Consulta retorno', SeriesColors[1]));

    let userConfig = await this._userConfigs.addAdminItem(new UserConfigurations(undefined, services));
    return Promise.resolve(userConfig);
  }

  private initializeControls(): void {
    this.titleCtrl = new FormControl(this.event.title, [Validators.required, Validators.maxLength(50)]);
    this.startTimeCtrl = new FormControl(this.event.startTime, Validators.required);
    this.endTimeCtrl = new FormControl(this.event.endTime, Validators.required);
    this.serviceCtrl = new FormControl(this.event.serviceId);
  }

  private calculateEndTime(start: Date, service: ProfessionalService): Date {
    let duration = service.duration && service.duration.indexOf(':') > 0 ? parseInt(service.duration.split[':'][1]) : 30;
    return dateFns.addMinutes(start, duration);
  }

  private updateErrors(): void {
    this.errorList = [];

    if (this.titleCtrl.invalid || this.startTimeCtrl.invalid || this.endTimeCtrl.invalid)
      this.errorList.push('Verifique todos os campos do formulário');
  }

  private async on_save_clicked(): Promise<void> {
    this.updateErrors();
    this.saveTouched = true;

    if (this.errorList.length > 0)
      return;
    
    this.loading = true;

    try {
      if (this.isNew)
        await this._consultService.addConsult(this.event);
      else
        await this._consultService.updateConsult(this.event);
    }
    catch (error) {
      this.on_error(error);
    }
    finally {
      this.loading = false;
      this._dialogRef.close();
    }
  }

  private on_cancel_click(): void {
    this._dialogRef.close();
  }

  private on_error(error: any): void {
    console.log(error);
    this.show_error_dialog(error);
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
}