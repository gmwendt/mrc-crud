import { AfterViewInit, Component, ChangeDetectorRef, OnDestroy, ViewEncapsulation } from "@angular/core";
import { Location } from '@angular/common';
import { MatTableDataSource } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";

import { Anamneses, FileSystemCommands, Patient } from "../../core/common/types";
import { PatientService } from "../../core/patient.service";

import { DialogAlertData, DialogAlertButton, DialogAlertResult } from "../../shared/dialog-alert/dialog-alert.component";
import { DialogService } from "../../shared/dialog.service";

import { Subscription } from "rxjs";

@Component({
  selector: 'page-patient-consult',
  templateUrl: './page-patient-consult.component.html',
  styleUrls: ['./page-patient-consult.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PagePatientConsultComponent implements AfterViewInit, OnDestroy {

  private _anamnesesRoute: string = 'anamneses';
  private _dirty: boolean;
  private _paramsDisposable: Subscription;
  
  private anamneses: MatTableDataSource<Anamneses>;
  private displayedColumns = ['clinicCase', 'commands'];
  private loading = true;
  private patient: Patient;
  
  constructor(private _route: ActivatedRoute, private _detector: ChangeDetectorRef, private _router: Router,
    private _patient: PatientService, private _location: Location , private _dialog: DialogService) {
  }

  ngAfterViewInit(): void {
    this._paramsDisposable = this._route.params.subscribe(async (params) => {
      var id = params['id'];
      if (!id)
        throw Error('Invalid patient');

      try {
        this.patient = await this._patient.getPatientById(id);
        this.createAnamnasesTable();
      }
      catch (error) {
        console.log(error);
      }
      finally {
        this.loading = false;
        this._detector.detectChanges();
      }
    });
  }

  get dirty(): boolean {
    return this._dirty;
  }

  private markAsDirty(): void {
    if (this._dirty)
      return;

    this._dirty = true;
    this._detector.markForCheck();
  }

  private checkErrors(): void {
    //TODO
  }

  private on_anamneses_edit(anamnesesId?: string): void {
    var id = anamnesesId ? anamnesesId : FileSystemCommands.Add;
    this.navigate(this._anamnesesRoute, id);
  }

  private async on_remove_anamneses_click(event: MouseEvent, anamnese: Anamneses): Promise<void> {
    event.stopPropagation();

    var dialogData: DialogAlertData = {
			text: 'Deseja remover ' + anamnese.clinicCase + '?',
			button: DialogAlertButton.YesNo,
			textAlign: 'center',
    }
    
    var dialogResult = await this._dialog.openAlert(dialogData);
    if (dialogResult == DialogAlertResult.No)
      return;

    this.loading = true;
    var index = this.patient.anamneses.indexOf(anamnese);

    try {
      this.patient.anamneses.splice(index, 1);
      await this._patient.updatePatient(this.patient);
      this.createAnamnasesTable();
    }
    catch (error) {
      this.on_error(error["statusText"]);
    }
    finally {
      this.loading = false;
    }
  }

  private createAnamnasesTable(): void {
    if (this.patient)
		  this.anamneses = new MatTableDataSource(this.patient.anamneses);
  }

  private navigate(route: string, id: string | FileSystemCommands, queryParams?: Object): void {
    this._router.navigate([route, id], { relativeTo: this._route, queryParams: queryParams });
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
		this.show_error_dialog(error);
  }
  
  ngOnDestroy(): void {
    if (this._paramsDisposable != null) {
      this._paramsDisposable.unsubscribe();
      this._paramsDisposable = null;
    }
  }
}