import { Component, ViewEncapsulation, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';

import { UserService } from '../core/user.service';

import { DialogAlertData, DialogAlertButton } from '../shared/dialog-alert/dialog-alert.component';
import { DialogService } from '../shared/dialog.service';

import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarView,
  DAYS_OF_WEEK
} from 'angular-calendar';

import { CustomDateFormatter } from './custom-date-formatter.provider';

@Component({
  selector: 'mrc-agenda',
  templateUrl: './agenda.component.html',
  // styleUrls: ['./.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class MrcAgendaComponent implements AfterViewInit, OnDestroy {
  private _loading: boolean;

  constructor(private _detector: ChangeDetectorRef, private _userService: UserService, private _dialog: DialogService) {
  }

  async ngAfterViewInit() {

  }

  ngOnDestroy() {

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

  view: CalendarView = CalendarView.Month;

  viewDate = new Date();

  events: CalendarEvent[] = [];

  locale: string = 'pt-PT';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  CalendarView = CalendarView;

  setView(view: CalendarView) {
    this.view = view;
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
}