import { Component, ViewEncapsulation, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { DialogServiceEditComponent } from './dialog-service-edit/dialog-service-edit.component';

import { Util } from '../core/common/helper';
import { UserConfigurations, ProfessionalService } from '../core/common/types';
import { UserService } from '../core/user.service';
import { UserConfigurationsService } from '../core/user-configurations.service';

import { DialogAlertData, DialogAlertButton, DialogAlertResult } from '../shared/dialog-alert/dialog-alert.component';
import { DialogService } from '../shared/dialog.service';

import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'user-configurations',
  templateUrl: './user-configurations.component.html',
  styleUrls: ['./user-configurations.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class UserConfigurationsComponent implements AfterViewInit, OnDestroy {
  private _paramsDisposable: Subscription;
  private _loading: boolean;

  private services: MatTableDataSource<ProfessionalService>;
  private servicesDisplayedColumns = ['name', 'price', 'commands'];

  private userConfig: UserConfigurations
  private selectedTabIndex: number;

  constructor(private _route: ActivatedRoute, private _detector: ChangeDetectorRef, private _userService: UserService, private _configService: UserConfigurationsService, private _dialog: DialogService) {
  }

  async ngAfterViewInit() {

    this._paramsDisposable = this._route.params.subscribe(async (params) => {
      let index = params['selectedIndex'];
      
      this.loading = true;
      
      try {
        await this.loadConfigs();
      }
      catch (error) {
        this.on_error(error);
      }
      finally {
        this.createServicesTable();
        this.selectedTabIndex = index ? parseInt(index) : 0;

        this.loading = false;
      }
    });
  }

  ngOnDestroy() {
    if (this._paramsDisposable != null) {
      this._paramsDisposable.unsubscribe();
      this._paramsDisposable = null;
    }
  }

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    if (value == this._loading)
      return;

    this._loading = value;
    this._detector.detectChanges();
  }

  private async loadConfigs(): Promise<void> {
    if (!this._userService.currentUser)
      return;
    
    let configs = await this._configService.getUserConfigs();
    if (!configs || configs.length == 0)
      await this.generateInitalConfigs();
    else
      this.userConfig = configs[0];
  }

  private async generateInitalConfigs(): Promise<void> {
    let services: ProfessionalService[] = [];
    services.push(new ProfessionalService('__fixed__' + Util.guid(), 'Consulta'));
    services.push(new ProfessionalService(Util.guid(), 'Consulta retorno'));

    this.userConfig = await this._configService.addAdminItem(new UserConfigurations(undefined, services));
  }

  private createServicesTable(): void {
    if (this.userConfig)
      this.services = new MatTableDataSource(this.userConfig.services);
  }

  private canRemove(id: string): boolean {
    if (id.indexOf('__fixed__') == -1)
      return true;
  }

  private async updateUserConfigs(): Promise<void> {
    this.loading = true;
    this._detector.detectChanges();

    try {
      await this._configService.updateUserConfigs(this.userConfig);
    }
    catch (error) {
      this.on_error(error);
    }
    finally {
      this.loading = false;
      this._detector.detectChanges();
    }
  }

  private async on_remove_service_click(event: MouseEvent, service: ProfessionalService): Promise<void> {
    event.stopPropagation();

    var dialogData: DialogAlertData = {
      text: `Deseja remover ${service.name}?`,
      button: DialogAlertButton.YesNo,
      textAlign: 'center',
    }

    var dialogResult = await this._dialog.openAlert(dialogData);
    if (dialogResult == DialogAlertResult.No)
      return;

    var index = this.userConfig.services.indexOf(service);
    if (index < 0)
      throw Error(`Remove Professional Service error: index not found.`);

    this.userConfig.services.splice(index, 1);
    this.createServicesTable();

    await this.updateUserConfigs();
  }

  private on_service_edit(service?: ProfessionalService): void {
    let isNew = !service;
    let dialogRef = this._dialog.open(DialogServiceEditComponent, { data: service });

    dialogRef.afterClosed().subscribe(async (result: ProfessionalService) => {
      if (!result)
      return;
      
      if (isNew) {
        if (!this.userConfig.services)
        this.userConfig.services = [];
        
        this.userConfig.services.push(result);
      }
      else {
        let index = this.userConfig.services.indexOf(service);
        if (index < 0)
          throw Error('Update Professional Service error: index not found.');
        
        this.userConfig.services[index].name = result.name;
        this.userConfig.services[index].price = result.price;
      }
      
      this.createServicesTable();
      await this.updateUserConfigs();
    });
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