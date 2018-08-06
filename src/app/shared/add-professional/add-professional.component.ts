import { Component, ViewEncapsulation } from '@angular/core';

import { DialogService } from '../dialog.service';

import { DialogSelector } from '../dialog-selector/dialog-selector.component';

@Component({
  selector: 'add-professional',
  templateUrl: './add-professional.component.html',
  styleUrls: ['./add-professional.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AddProfessionalComponent {
  private Key: string = 'especialidade';
  private Title: string = 'Especialidade';

  private specialties: string;

  constructor(private _dialog: DialogService) {    
  }

  private select_specialties_clicked(): void {
    var dialogRef = this._dialog.open(DialogSelector, { disableClose: true, height: "400px"});
    dialogRef.componentInstance.columns.push({ key: this.Key, title: this.Title });
    dialogRef.componentInstance.data = DATA_MOCKED;

    dialogRef.afterClosed().subscribe((result: any[]) => {
      if (!result || result.length == 0)
        return;

      this.specialties = '';
      result.forEach(esp => this.specialties += esp[this.Key] + ';');
    });
  }
}

const DATA_MOCKED: any[] = [
  { 'especialidade': 'Cardiologia' }, 
  { 'especialidade': 'Dermatologia' }, 
  { 'especialidade': 'Nutrição' }, 
  { 'especialidade': 'Oftalmologia' }, 
  { 'especialidade': 'Urologia' }
]