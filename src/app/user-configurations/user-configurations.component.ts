import { Component, ViewEncapsulation, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { UserConfigurations, ProfessionalService } from '../core/common/types';
import { Util } from '../core/common/worker';
import { UserService } from '../core/user.service';
import { UserConfigurationsService } from '../core/user-configurations.service';

import { DialogAlertData, DialogAlertButton } from '../shared/dialog-alert/dialog-alert.component';
import { DialogService } from '../shared/dialog.service';

import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'user-configurations',
  templateUrl: './user-configurations.component.html',
  // styleUrls: ['./user-configurations.component.css'],
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
      this.selectedTabIndex = index ? parseInt(index) : 0;
      this._detector.detectChanges();
    });

    this.loading = true;
    
    try {
      await this.loadConfigs();
    }
    catch (error) {
      this.on_error(error);
    }
    finally {
      this.createServicesTable();

      this.loading = false;
    }
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
      this.generateInitalConfigs();
    else
      this.userConfig = configs[0];
  }

  private async generateInitalConfigs(): Promise<void> {
    //TODO
    let services: ProfessionalService[] = [];
    services.push(new ProfessionalService('__fixed__' + Util.guid(), 'Consulta'));
    services.push(new ProfessionalService(Util.guid(), 'Consulta retorno'));

    this.userConfig = await this._configService.addAdminItem(new UserConfigurations(undefined, services));
    debugger;
  }

  private createServicesTable(): void {
    if (this.userConfig)
      this.services = new MatTableDataSource(this.userConfig.services);
  }

  private canRemove(id: string): boolean {
    if (id.indexOf('__fixed__') == -1)
      return true;
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