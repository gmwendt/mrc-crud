import { Component, ViewEncapsulation, Input } from "@angular/core";

@Component({
  selector: 'time-input',
  templateUrl: './time-input.component.html',
  //styleUrls: ['./time-input.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TimeInputComponent {

  @Input()
  value: string;

  private on_key_press(e: KeyboardEvent): void {
    if (e.charCode < 48 || e.charCode > 57)
      e.preventDefault();
  }
}