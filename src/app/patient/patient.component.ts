import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from "@angular/router";

import { Patient } from "../core/common/types";

import { PatientService } from "../core/patient.service";
import { UserService } from "../core/user.service";

import { DialogAlertButton, DialogAlertData, DialogAlertResult } from "../shared/dialog-alert/dialog-alert.component";
import { DialogService } from "../shared/dialog.service";

@Component({
  selector: 'mrc-patients',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PatientComponent implements OnInit {

  private displayedColumns = ['name', 'commands'];
  private loading = true;
  private patients: Patient[];
  private dataSource;

  constructor(private _userService: UserService, private _patient: PatientService, private _dialog: DialogService,
    private _router: Router, private _route: ActivatedRoute) {

  }

  async ngOnInit(): Promise<void> {
    try {
      await this.loadPatients();
    }
    finally {
      this.loading = false;
    }
  }

  private async loadPatients(): Promise<void> {
    if (!this._userService.currentUser)
      return;

    var accId = this._userService.currentUser.accountRefId;
    this.patients = await this._patient.getAllPatients();

    this.createTable();
  }

  private async delete_patient_clicked(patient: Patient): Promise<void> {
    var dialogData: DialogAlertData = {
			text: 'Deseja remover ' + patient.name + '?',
			button: DialogAlertButton.YesNo,
			textAlign: 'center',
    }
    
    var dialogResult = await this._dialog.openAlert(dialogData);
    if (dialogResult == DialogAlertResult.No)
      return;

    this.loading = true;
    var index = this.patients.indexOf(patient);

    try {
      await this._patient.deletePatient(patient._id);

      this.patients.splice(index, 1);
      this.dataSource.data = this.patients;
    }
    catch (error) {
      this.on_error(error["statusText"]);
    }
    finally {
      this.loading = false;
    }
  }

  private async editPatient(patient?: Patient): Promise<void> {
    if (!patient) {
      try {
        var newPatient = await this._patient.addPatient(new Patient(this._userService.currentUser.accountRefId));
        if (!newPatient)
          return;

        this.patients.push(newPatient);
        this.dataSource.data = this.patients;

        this.navigate(newPatient, { NewPatient: true });
      }
      catch (error) {
        this.on_error(error["statusText"]);
      }
    }
    else 
      this.navigate(patient);
  }

  private createTable(): void {
		this.dataSource = new MatTableDataSource(this.patients);
  }

  private navigate(patient: Patient, queryParams?: Object): void {
    this._router.navigate(['consulta', patient._id], { relativeTo: this._route, queryParams: queryParams });
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