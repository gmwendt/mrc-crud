import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from "@angular/router";

import { Patient, FileSystemCommands } from "../core/common/types";

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
  private dataSource: MatTableDataSource<Patient>;

  constructor(private _userService: UserService, private _patient: PatientService, private _dialog: DialogService,
    private _router: Router, private _route: ActivatedRoute) {

  }

  async ngOnInit(): Promise<void> {
    try {
      await this.loadPatients();
    }
    catch (error) {
      this.on_error(error);
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

  private async on_remove_patient_click(event: MouseEvent, patient: Patient): Promise<void> {
    event.stopPropagation();

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
      this.on_error(error);
    }
    finally {
      this.loading = false;
    }
  }

  private async editPatient(patient?: Patient): Promise<void> {
    var id = patient ? patient._id : FileSystemCommands.Add; 
    this.navigate('edit', id);
  }

  private createTable(): void {
    this.patients.sort((a,b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
    
		this.dataSource = new MatTableDataSource(this.patients);
  }

  private navigate(routeId: string, patientId: string | FileSystemCommands, queryParams?: Object): void {
    this._router.navigate([routeId, patientId], { relativeTo: this._route, queryParams: queryParams });
  }

  private applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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