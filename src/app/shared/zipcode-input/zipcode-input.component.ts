import { Component, ViewChild, ViewEncapsulation, ElementRef, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'zipcode-input',
  templateUrl: './zipcode-input.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ZipcodeInputComponent {

  @ViewChild('box') _box: ElementRef;

  @Output()
  valueChange: EventEmitter<string> = new EventEmitter<string>();

  private _value: string;
  
  private on_key_press(e: KeyboardEvent): void {
    if ((e.charCode < 48 || e.charCode > 58 ) && e.keyCode != 9 && e.keyCode != 8 && !e.ctrlKey) 
      e.preventDefault();

    if (this._box.nativeElement.value.length >= 8)
      e.preventDefault();
  }
  
  private on_key_up(e: KeyboardEvent): void {
      this.value = this._box.nativeElement.value;
  }

  private on_blur(): void {
    var test: string = this._box.nativeElement.value;
    if (!test.includes('-') && test.length == 8) {
      this._box.nativeElement.value = test.slice(0, 5) + '-' + test.slice(5, 8);
    }
  }

  private on_focus(): void {
    var test: string = this._box.nativeElement.value;
    if (test.includes('-') && test.length == 9) 
    this._box.nativeElement.value = test.replace('-', '');
  }
  
  @Input()
  set value(value: string) {
    if (!this._box || this._value == value)
      return;

    if (this._box.nativeElement.value != value && value.length == 8)
      this._box.nativeElement.value = value.slice(0, 5) + '-' + value.slice(5, 8);

    this._value = value;
    this.valueChange.emit(value);
  }
}