import { Component, ViewEncapsulation, Inject, OnInit, AfterViewInit, OnDestroy, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSelect, MatTableDataSource, MatSelectChange } from "@angular/material";
import { FormControl } from "@angular/forms";
import { ReplaySubject, Subject } from "rxjs";
import { take, takeUntil } from 'rxjs/operators';
import { IFoodDetail, IFoodMeasurement } from "../../../core/common/types";
import { FoodService } from "../../../core/food.service";

export interface IDialogAddMealData {
  useFoodDb: boolean;
}

@Component({
  selector: 'dialog-add-meal',
  templateUrl: './dialog-add-meal.component.html',
  styleUrls: ['./dialog-add-meal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DialogAddMeal implements OnInit, AfterViewInit, OnDestroy {
  private useFoodDb: boolean;
  private foods: IFoodDetail[] = [];
  /** control for the selected food */
  private foodCtrl: FormControl = new FormControl();
  /** control for the MatSelect filter keyword */
  private foodFilterCtrl: FormControl = new FormControl();
  /** list of foods filtered by search keyword */
  private filteredFoods: ReplaySubject<IFoodDetail[]> = new ReplaySubject<IFoodDetail[]>(1);
  private dataSource: MatTableDataSource<IFoodDetail>;
  private tableDisplayedColumns: string[] = ['description', 'measurements'];

  private _selectedFoods: IFoodDetail[] = [];

  @ViewChild('select') select: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor(private _dialogRef: MatDialogRef<DialogAddMeal>, private _detector: ChangeDetectorRef, @Inject(MAT_DIALOG_DATA) data: IDialogAddMealData, 
    private _food: FoodService) {
    this.useFoodDb = data.useFoodDb;
  }

  async ngOnInit() {
    // load the initial food list
    this.filteredFoods.next(this.foods.slice());

    // listen for search field value changes
    this.foodFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterFoods();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }


  private refreshTable(): void {
    this.dataSource = new MatTableDataSource(this._selectedFoods);
    this._detector.detectChanges();
  }

  /**
   * Sets the initial value after the filteredFoods are loaded initially
   */
  private setInitialValue() {
    this.filteredFoods
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredFoods are loaded initially
        // and after the mat-option elements are available
        this.select.compareWith = (a: IFoodDetail, b: IFoodDetail) => a && b && a.id === b.id;
      });
  }

  private async filterFoods(): Promise<void> {
    // get the search keyword
    let search = this.foodFilterCtrl.value;

    if (!this.foodFilterCtrl.value || this.foodFilterCtrl.value.length <= 2) {
      this.foods = [];
      this.filteredFoods.next(this.foods.slice());
      return;
    }

    this.foods = await this._food.tacoFilter(this.foodFilterCtrl.value, ['id', 'description', 'measurements']);

    if (!this.foods) 
      return;
    
    // filter the foods
    this.filteredFoods.next(
      this.foods.filter(food => food.description.toLowerCase().indexOf(search) > -1)
    );
  }

  private async on_selection_change(event: MatSelectChange): Promise<void> {
    if (!event.value || !event.value.id)
      return;

    this._selectedFoods.push(event.value);
    this.refreshTable();
  }
}