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

  constructor(private _dialog: DialogService) {    
  }

  private select_specialties_clicked(): void {
    var dialogRef = this._dialog.open(DialogSelector, { disableClose: true, height: "400px"});

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}