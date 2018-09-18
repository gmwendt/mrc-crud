import { Component, Input, ViewEncapsulation } from '@angular/core';

import { DialogService } from '../dialog.service';

import { DialogProfessionalScheduleComponent } from '../dialog-professional-schedule/dialog-professional-schedule.component';
import { DialogSelector } from '../dialog-selector/dialog-selector.component';

export class ProfessionalData {
  public active: boolean;
  public professionalRegisterNum: string;
  public professionalRegisterState: string;
  public specialites: string;
}

export interface ScheduleInterval {
  end: string;
  start: string;
}

const TABLE_DATA: ScheduleInterval[] = [
  { start: '9:00', end: '12:00' },
  { start: '13:00', end: '18:00' },
  { start: '13:00', end: '18:00' },
  { start: '13:00', end: '18:00' },
  { start: '13:00', end: '18:00' },
];

@Component({
  selector: 'add-professional',
  templateUrl: './add-professional.component.html',
  styleUrls: ['./add-professional.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AddProfessionalComponent {
  private Key: string = 'especialidade';
  private Title: string = 'Especialidade';

  private displayedColumns: string[] = ['start', 'end', 'commands' ];
  private dataSource = TABLE_DATA;

  @Input() data: ProfessionalData;
  // public current: ProfessionalData = {
  //   active: true,
  //   professionalRegisterNum: '',
  //   professionalRegisterState: '',
  //   specialites: ''
  // };

  constructor(private _dialog: DialogService) {    
  }

  private select_specialites_clicked(): void {
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

  private professional_schedule_clicked(): void {
    var dialogRef = this._dialog.open(DialogProfessionalScheduleComponent)//, { disableClose: true, height: "450px"});

  }

  private add_specialite(): void {
    //todo
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