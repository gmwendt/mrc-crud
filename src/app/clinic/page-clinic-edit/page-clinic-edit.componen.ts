import { AfterViewInit, Component, OnDestroy, ViewEncapsulation } from "@angular/core";

import { ActivatedRoute } from "@angular/router";

import { ClinicService } from "../../core/clinic.service";

import { Clinic } from "../../core/common/types";

import { Subscription } from 'rxjs';

@Component({
  selector: 'page-clinic-edit',
  templateUrl: 'page-clinic-edit.component.html',
  styleUrls: ['./page-clinic-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PageClinicEditComponent implements AfterViewInit, OnDestroy {

  private _paramsDisposable: Subscription;

  private clinic: Clinic;

  constructor(private _route: ActivatedRoute, private _clinic: ClinicService) {
  }

  ngAfterViewInit(): void {
    this._paramsDisposable = this._route.params.subscribe(async (params) => {
      var id = params['id'];
      if (!id)
        throw Error('Invalid clinic');

        try {
          this.clinic = await this._clinic.getClinicById(id);
        }
        catch (error) { console.log(error); }
    });
  }

  ngOnDestroy(): void {
    if (this._paramsDisposable != null) {
      this._paramsDisposable.unsubscribe();
      this._paramsDisposable = null;
    }
  }
}