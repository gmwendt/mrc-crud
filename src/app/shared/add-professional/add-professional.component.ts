import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material';

import { DialogService } from '../dialog.service';

import { DialogSelector } from '../dialog-selector/dialog-selector.component';

import { ScheduleMap, ScheduleInterval } from '../../mrc/common/types';
import { DaysNameEnum, DaysName } from '../../mrc/common/constants';

export class ProfessionalData {
  public active: boolean;
  public professionalRegisterNum: string;
  public professionalRegisterState: string;
  public specialites: string;
  public schedule: ScheduleMap;
  public errors: ProfessionalDataErrors
}

export class ProfessionalDataErrors {
  public scheduleError?: boolean;
  public scheduleErrorMsg?: string;

  public registerNumError?: boolean;
  public registerNumErrorMsg?: string;

  public registerStateError?: boolean;
  public registerStateErrorMsg?: string;
}

export class ScheduleError {
  public hasError: boolean;
  public errorMsg?: string;
}

@Component({
  selector: 'add-professional',
  templateUrl: './add-professional.component.html',
  styleUrls: ['./add-professional.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AddProfessionalComponent implements OnInit {
  private Key: string = 'especialidade';
  private Title: string = 'Especialidade';

  private displayedColumns: string[] = ['start', 'end', 'commands' ];
  private dataSource;

  private _selectedTabIndex: number = 0;

  @Input() data: ProfessionalData;

  constructor(private _dialog: DialogService) {    
  }

  ngOnInit() {
    if (!this.data.schedule) {
      this.data.schedule = {};
      for (var i = 0; i < DaysNameEnum.Length; i++) 
        this.data.schedule[i] = [];
    }

    this.dataSource = new MatTableDataSource(this.data.schedule[this._selectedTabIndex]);
  }

  checkErrors(): boolean {
    var error = this.check_schedule_consistency();

    if (error.hasError) {
      this.data.errors.scheduleError = true;
      this.data.errors.scheduleErrorMsg = error.errorMsg;
      return true;
    }
      //TODO: other profesional errors

    return false;
  }

  private open_specialites_dialog(): void {
    var dialogRef = this._dialog.open(DialogSelector, { disableClose: true, height: "450px"});
    dialogRef.componentInstance.columns.push({ key: this.Key, title: this.Title });
    dialogRef.componentInstance.data = DATA_MOCKED;

    dialogRef.componentInstance.notfoundMsg = 'Não encontrou sua especialidade na lista?';
    dialogRef.componentInstance.notfoundLinkMsg = 'Clique aqui para adicionar outras especialidades';
    dialogRef.componentInstance.addItemClicked.subscribe(() => this.add_specialite());

    var splittedSelection = this.data.specialites.split(';');
    splittedSelection.forEach(element => {
      var esp = element.trim();
      if (esp) {
        var row = dialogRef.componentInstance.data.find(data => {
          if (data[this.Key] == esp) 
            return data;
        });

        dialogRef.componentInstance.selection.select(row);
      }
    });

    dialogRef.afterClosed().subscribe((result: any[]) => {
      if (!result || result.length == 0)
        return;

      this.data.specialites = '';
      result.forEach(esp => this.data.specialites += esp[this.Key] + '; ');
    });
  }

  private add_specialite(): void {
    //todo
  }

  private check_schedule_consistency(): ScheduleError {
    for (var i = 0; i < DaysNameEnum.Length; i++) {
      var daySchedule: ScheduleInterval[] = this.data.schedule[i];
      
      for (var j = 0; j < daySchedule.length; j++) {
        for (var k = 0; k < daySchedule.length; k++) {

          var interval: ScheduleInterval = daySchedule[j];
          var intervalAux: ScheduleInterval = daySchedule[k];

          var startJ = this.timeStringToNumber(interval.start);
          var endJ = this.timeStringToNumber(interval.end);
          var startK = this.timeStringToNumber(intervalAux.start);
          var endK = this.timeStringToNumber(intervalAux.end);

          if (j == k)  {
            if (endJ <= startJ)
              return { hasError: true, errorMsg: 'Verifique hora inválida em ' + DaysName.translateDayName(i) };

            continue;
          }

          if (endJ <= startJ)
            return { hasError: true, errorMsg: 'Verifique hora inválida em ' + DaysName.translateDayName(i) };
          if (startJ >= startK && startJ <= endK)
            return { hasError: true, errorMsg: 'Verifique hora inválida em ' + DaysName.translateDayName(i) };
          if (endJ >= startK && endJ <= endK)
            return { hasError: true, errorMsg: 'Verifique hora inválida em ' + DaysName.translateDayName(i) };
        }
      }
    }

    return { hasError: false };
  }

  private timeStringToNumber(time: string): number {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;

    return hours + minutes / 60;
  }

  private on_select_specialites_click(): void {
    this.open_specialites_dialog();
  }

  private on_selected_tab_change(event: MatTabChangeEvent): void {
    this.dataSource = this.data.schedule[this._selectedTabIndex];
  }

  private on_start_change(index: number, value: string): void {
    this.data.schedule[this._selectedTabIndex][index].start = value;
  }

  private on_end_change(index: number, value: string): void {
    this.data.schedule[this._selectedTabIndex][index].end = value;
  }

  private on_delete_click(index: number): void {
    this.data.schedule[this._selectedTabIndex].splice(index, 1);
    this.dataSource = new MatTableDataSource(this.data.schedule[this._selectedTabIndex]);
  }

  private on_add_schedule_click(): void {
    this.data.schedule[this._selectedTabIndex].push({ end: '', start: '' });
    this.dataSource = new MatTableDataSource(this.data.schedule[this._selectedTabIndex]);
  }
}

//todo: store data in db
const DATA_MOCKED: any[] = [
  { 'especialidade': 'Acupuntura' }, 
  { 'especialidade': 'Alergia' }, 
  { 'especialidade': 'Cardiologia' }, 
  { 'especialidade': 'Cirurgia da Mão' }, 
  { 'especialidade': 'Cirurgia de Cabeça e Pescoço' }, 
  { 'especialidade': 'Cirurgia do Aparelho Digestivo' }, 
  { 'especialidade': 'Cirurgia Geral' }, 
  { 'especialidade': 'Cirurgia Pediátrica' }, 
  { 'especialidade': 'Cirurgia Plástica' }, 
  { 'especialidade': 'Cirurgia Torácica' }, 
  { 'especialidade': 'Cirurgia Vascular' }, 
  { 'especialidade': 'Clínica Médica' }, 
  { 'especialidade': 'Dermatologia' }, 
  { 'especialidade': 'Nutrição' }, 
  { 'especialidade': 'Oftalmologia' }, 
  { 'especialidade': 'Oncologia' }, 
  { 'especialidade': 'Patologia' }, 
  { 'especialidade': 'Pediatria' }, 
  { 'especialidade': 'Psicologia' }, 
  { 'especialidade': 'Psiquiatria' }, 
  { 'especialidade': 'Radiologia' }, 
  { 'especialidade': 'Urologia' }
]