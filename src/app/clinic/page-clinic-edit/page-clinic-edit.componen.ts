import { AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, Component, OnDestroy, ViewEncapsulation, } from "@angular/core";

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

  constructor(private _route: ActivatedRoute, private _detector: ChangeDetectorRef, private _clinic: ClinicService) {
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

  get dirty(): boolean {
    return this._dirty;
  }

  private setDirty(): void {
    this._dirty = true;
  }

  private onChange(): void {
    this.setDirty();
    this._detector.detectChanges();
  }

  private async on_apply_clicked(): Promise<void> {
    if (!this.dirty)
      return;

    //TODO
    //this.loading
    await this._clinic.updateClinic(this.clinic);
  }

  private on_cancel_clicked(): void {
    //TODO: navigate back
  }

  ngOnDestroy(): void {
    if (this._paramsDisposable != null) {
      this._paramsDisposable.unsubscribe();
      this._paramsDisposable = null;
    }
  }
}