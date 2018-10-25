import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material';

import { DialogService } from '../dialog.service';

import { DialogSelector } from '../dialog-selector/dialog-selector.component';

import { ScheduleMap, ScheduleInterval } from '../../mrc/common/types';
import { DaysName } from '../../mrc/common/constants';

export class ProfessionalData {
  public active: boolean;
  public professionalRegisterNum: string;
  public professionalRegisterState: string;
  public specialites: string;
  public schedule: ScheduleMap;
}

export class ProfessionalDataErrors {

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
      for (var i = 0; i < DaysName.Length; i++) 
        this.data.schedule[i] = [];
    }

    this.dataSource = new MatTableDataSource(this.data.schedule[this._selectedTabIndex]);
  }

  get hasErrors(): boolean {
    //TODO: next step
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

  private check_schedule_consistency(): boolean {
    for (var i = 0; i < DaysName.Length; i++) {
      var interval: ScheduleInterval[] = this.data.schedule[i];
    //TODO: next step

    }

    return false;
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