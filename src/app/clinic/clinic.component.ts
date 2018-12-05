import { Component, ViewEncapsulation, ElementRef, OnInit } from "@angular/core";
import { MatTableDataSource } from '@angular/material';
import { Router } from "@angular/router";

import { ClinicService } from "../core/clinic.service";
import { UserService } from "../core/user.service";

import { Clinic } from "../core/common/types";

import { DialogService } from "../shared/dialog.service";

import { DialogAlertData, DialogAlertButton, DialogAlertResult } from "../shared/dialog-alert/dialog-alert.component";

@Component({
  selector: 'mrc-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClinicComponent implements OnInit {
  private displayedColumns = ['name', 'commands'];
  private loading = true;
  private clinics: Clinic[];
  private dataSource;
  
  constructor(private _userService: UserService, private _clinic: ClinicService, private _dialog: DialogService,
              private _router: Router) {
  }

  async ngOnInit(): Promise<void> {
    try {
      await this.loadClinics();
    }
    finally {
      this.loading = false;
    }
  }

  add_clinic_clicked(): void {
    // var dialogConfig: MatDialogConfig = {
    //   height: '100%',
    //   width: '100%'
    // }
    // var dialogRef = this._dialog.open(DialogClinicEditComponent, dialogConfig);
  }

  private async loadClinics(): Promise<void> {
    if (!this._userService.currentUser)
      return;

    var accId = this._userService.currentUser.accountRefId;
    this.clinics = await this._clinic.listAccountClinics(accId);

    this.createTable();
  }

  private async delete_clinic_clicked(clinic: Clinic): Promise<void> {
    //TODO: Testar se está removendo do server
    var dialogData: DialogAlertData = {
			text: 'Deseja remover ' + clinic.name + '?',
			button: DialogAlertButton.YesNo,
			textAlign: 'center',
    }
    
    var dialogResult = await this._dialog.openAlert(dialogData);
    if (dialogResult == DialogAlertResult.No)
      return;

    this.loading = true;
    var index = this.clinics.indexOf(clinic);

    var deleteResponse = await this._clinic.deleteClinic(clinic._id);
    if (!deleteResponse["ok"]) {
      this.on_error(deleteResponse["statusText"]);
			return;
    }

    this.clinics.splice(index, 1);
    this.dataSource.data = this.clinics;
    this.loading = false;
  }

  private createTable(): void {
		this.dataSource = new MatTableDataSource(this.clinics);
  }
  
  private navigate(): void {
    this._router.navigate(['clinicas/edit']);
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
		this.loading = false;
		this.show_error_dialog(error);
	}
}