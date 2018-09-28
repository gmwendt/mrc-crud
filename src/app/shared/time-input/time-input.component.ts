import { Component, ViewEncapsulation, Input, } from "@angular/core";

@Component({
  selector: 'time-input',
  templateUrl: './time-input.component.html',
  //styleUrls: ['./time-input.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TimeInputComponent {

  @Input()
  value: string = "";

  private on_key_press(e: KeyboardEvent): void {
    if ((e.charCode < 48 || e.charCode > 58 ) && e.keyCode != 9)
      e.preventDefault();
  }

  private on_blur(): void {
    console.log('on_blur');
  }
}