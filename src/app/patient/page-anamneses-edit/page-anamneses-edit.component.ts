import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Anamneses, FileSystemCommands, AlimentarRestrictionEnum, LifeHabits, FrequencyEnum, SleepEnum } from "../../core/common/types";

@Component({
  selector: 'page-anamneses-edit',
  templateUrl: './page-anamneses-edit.component.html',
  styleUrls: ['./page-anamneses-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PageAnamnesesEditComponent implements AfterViewInit, OnDestroy {

  private _paramsDisposable: Subscription;
  private _queryParamsDisposable: Subscription;
  private _dirty: boolean;
  
  private isNew: boolean;
  private anamnase: Anamneses;

  private alimentarRestritionEnum = AlimentarRestrictionEnum;
  private frequencyEnum = FrequencyEnum;
  private sleepEnum = SleepEnum;

  constructor(private _route: ActivatedRoute, private _detector: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this._paramsDisposable = this._route.params.subscribe(async (params) => {
      var patientId = params['id'];
      var anamnesesId = params['anamnesesId'];

      this.isNew = parseInt(anamnesesId) == FileSystemCommands.Add; 
      this._detector.detectChanges();

      if (this.isNew)
        this.anamnase = new Anamneses('', '', '', new LifeHabits());
      //TODO
      // else
      //   this.anamnase = await this.load_anamnase();
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

  private on_apply_clicked(): void {

  }

  private on_cancel_clicked(): void {
    console.log(this.anamnase);
    if (this.anamnase.lifeHabits)
      console.log(this.anamnase.lifeHabits.alimentarRestriction);
    else
      console.log("no lifeHabits");
  }

  ngOnDestroy(): void {
    if (this._paramsDisposable != null) {
      this._paramsDisposable.unsubscribe();
      this._paramsDisposable = null;
    }
    if (this._queryParamsDisposable != null) {
      this._queryParamsDisposable.unsubscribe();
      this._queryParamsDisposable = null;
    }
  }
}