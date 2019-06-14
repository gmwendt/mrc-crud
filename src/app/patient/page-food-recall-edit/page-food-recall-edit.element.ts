import { Component, ViewEncapsulation, AfterViewInit, OnDestroy, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: 'page-food-recall-edit',
  templateUrl: './page-food-recall-edit.element.html',
  // styleUrls: ['./page-food-recall-edit.element.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PageFoodRecallEditComponent implements AfterViewInit, OnDestroy {

  constructor() {

  }
  
  ngAfterViewInit() {

  }

  ngOnDestroy() {

  }
}