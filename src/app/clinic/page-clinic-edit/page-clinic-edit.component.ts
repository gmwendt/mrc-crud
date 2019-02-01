import { AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, Component, OnDestroy, QueryList, ViewChildren, ViewEncapsulation, ViewChild } from "@angular/core";

import { Location } from '@angular/common';

import { ActivatedRoute } from "@angular/router";

import { ClinicService } from "../../core/clinic.service";
import { AddressInfo, Clinic } from "../../core/common/types";

import { MrcInputPhoneMaskDirective } from "../../shared/input-phone-mask.directive";
import { MrcInputRequiredDirective } from "../../shared/input-required.directive";
import { ZipcodeInputComponent } from "../../shared/zipcode-input/zipcode-input.component";

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
  private errorList: string[] = [];

  @ViewChild(ZipcodeInputComponent) zipcodeInput: ZipcodeInputComponent;
  @ViewChildren(MrcInputRequiredDirective) genericRequiredInputs: QueryList<MrcInputRequiredDirective>;
  @ViewChildren(MrcInputPhoneMaskDirective) phoneInputs: QueryList<MrcInputPhoneMaskDirective>;

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

  private checkErrors(): void {
    this.errorList = [];

    //check zipcode input
    if (this.zipcodeInput.showErrors)
      this.zipcodeInput.updateBorderColor();
    else
      this.zipcodeInput.showErrors = true;

    if (this.zipcodeInput.error)
      this.errorList.push(this.zipcodeInput.error);
      
    //check generic inputs
    this.genericRequiredInputs.forEach(input => {
      if (input.showErrors)
        input.updateBorderColor();
      else
        input.showErrors = true;

      if (input.isNullOrEmpty)
        this.errorList.push(input.emptyError);
    });

    //check phone1 errors
    this.phoneInputs.forEach(input => {
      if (input.showErrors)
        input.updateBorderColor();
      else
        input.showErrors = true;

      if (input.error)
        this.errorList.push(input.error);
    })
  }

  private async on_apply_clicked(): Promise<void> {
    if (!this.dirty)
      return;

    this.checkErrors();

    if (this.errorList.length > 0)
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

  private on_zipcode_update(address: AddressInfo): void {
    this.clinic.address = address;
    this.markAsDirty();
  }

  ngOnDestroy(): void {
    if (this._paramsDisposable != null) {
      this._paramsDisposable.unsubscribe();
      this._paramsDisposable = null;
    }
  }
}