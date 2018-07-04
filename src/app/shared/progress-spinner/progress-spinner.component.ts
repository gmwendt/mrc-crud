import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'progress-spinner',
	templateUrl: './progress-spinner.component.html',
	styleUrls: ['./progress-spinner.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class ProgressSpinnerComponent {
  @Input() progress: boolean;
}