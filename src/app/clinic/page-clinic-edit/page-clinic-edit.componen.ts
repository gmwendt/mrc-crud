import { AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, Component, OnDestroy, ViewEncapsulation, } from "@angular/core";

import { Location } from '@angular/common';

import { ActivatedRoute } from "@angular/router";

import { ClinicService } from "../../core/clinic.service";

import { Clinic } from "../../core/common/types";

import { Subscription } from 'rxjs';

@Component({
  selector: 'page-clinic-edit',
  templateUrl: 'page-clinic-edit.component.html',
  styleUrls: ['./page-clinic-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PageClinicEditComponent implements AfterViewInit, OnDestroy {

  private _paramsDisposable: Subscription;

  private _dirty: boolean;

  private clinic: Clinic;

  constructor(private _route: ActivatedRoute, private _detector: ChangeDetectorRef, 
    private _clinic: ClinicService, private _location: Location) {
  }

  ngAfterViewInit(): void {
    this._paramsDisposable = this._route.params.subscribe(async (params) => {
      var id = params['id'];
      if (!id)
        throw Error('Invalid clinic');

        try {
          this.clinic = await this._clinic.getClinicById(id);
        }
        catch (error) { 
          console.log(error); 
        }
        finally {
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

  private async on_apply_clicked(): Promise<void> {
    if (!this.dirty)
      return;

    //TODO
    //this.loading = true;
    await this._clinic.updateClinic(this.clinic);
    //this.loading = false;
    this._location.back();
  }

  private on_cancel_clicked(): void {
    this._location.back();
  }

  ngOnDestroy(): void {
    if (this._paramsDisposable != null) {
      this._paramsDisposable.unsubscribe();
      this._paramsDisposable = null;
    }
  }
}