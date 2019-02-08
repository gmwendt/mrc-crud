import { Component, ViewEncapsulation, ElementRef, OnInit } from "@angular/core";
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from "@angular/router";

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
              private _router: Router, private _route: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
    try {
      await this.loadClinics();
    }
    finally {
      this.loading = false;
    }
  }

  private async loadClinics(): Promise<void> {
    if (!this._userService.currentUser)
      return;

    var accId = this._userService.currentUser.accountRefId;
    this.clinics = await this._clinic.listAccountClinics(accId);

    this.createTable();
  }

  private async delete_clinic_clicked(clinic: Clinic): Promise<void> {
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

    try {
      await this._clinic.deleteClinic(clinic._id);

      this.clinics.splice(index, 1);
      this.dataSource.data = this.clinics;
    }
    catch (error) {
      this.on_error(error["statusText"]);
    }
    finally {
      this.loading = false;
    }
  }

  private createTable(): void {
		this.dataSource = new MatTableDataSource(this.clinics);
  }

  private async editClinic(clinic?: Clinic): Promise<void> {
    if (!clinic) {
      try {
        var newClinic = await this._clinic.addClinic(new Clinic(this._userService.currentUser.accountRefId));
        if (!newClinic)
          return;

        this.clinics.push(newClinic);
        this.dataSource.data = this.clinics;

        this.navigate(newClinic, { NewClinic: true });
      }
      catch (error) {
        this.on_error(error["statusText"]);
      }
    }
    else
      this.navigate(clinic);
  }
  
  private navigate(clinic: Clinic, queryParams?: Object): void {
    this._router.navigate(['edit', clinic._id], { relativeTo: this._route, queryParams: queryParams });
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