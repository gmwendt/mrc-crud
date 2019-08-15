import { Component, ViewEncapsulation, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';

import { UserService } from '../core/user.service';

import { DialogAlertData, DialogAlertButton } from '../shared/dialog-alert/dialog-alert.component';
import { DialogService } from '../shared/dialog.service';

import { DialogCalendarEventData, DialogCalendarEventEdit } from './dialog-calendar-event-edit/dialog-calendar-event-edit.component';
import { CustomDateFormatter } from './custom-date-formatter.provider';

import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarView,
  DAYS_OF_WEEK
} from 'angular-calendar';

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
  private _isDayClicked: boolean;
  private _isTimeSegClicked: boolean;
  private _clickedDate: Date;
  
  view: CalendarView = CalendarView.Month;
  viewDate = new Date();
  events: CalendarEvent[] = [];
  locale: string = 'pt-BR';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  CalendarView = CalendarView;

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

  private setView(view: CalendarView) {
    this.view = view;
  }

  private dayNavigate(date: Date): void {
    this.setView(CalendarView.Day);
    this.viewDate = date;
    this._detector.detectChanges();
  }

  private on_calendar_dblclick(): void {
    if (this._isDayClicked) 
      this.dayNavigate(this._clickedDate);
    if (this._isTimeSegClicked) {
      let event: DialogCalendarEventData = {
        eventId: null,
        start: this._clickedDate
      };

      let dialogRef = this._dialog.open(DialogCalendarEventEdit, { data: event });
      //TODO
    }
  }

  private on_day_clicked(date: Date): void {
    this._isDayClicked = true;
    this._clickedDate = date;
    setTimeout(() => this._isDayClicked = false, 501);
  }

  private on_time_segmment_clicked(date: Date): void {
    this._isTimeSegClicked = true;
    setTimeout(() => this._isTimeSegClicked = false, 501);
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