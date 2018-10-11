import { Component, ElementRef, Input, ViewChild, ViewEncapsulation, } from "@angular/core";

@Component({
  selector: 'time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TimeInputComponent {

  @Input()
  value: string = "";

  private _maxCharacters: number = 2;
  private _minValue: number = 0

  private on_key_down(e: KeyboardEvent, target: HTMLInputElement, max: number): void {
    //UP ARROW
    if (e.keyCode == 38) { 
      var value: number = this.isNullOrEmpty(target.value) ? 0 : parseInt(target.value);
      value++;

      if (value > max)
        value = max;

      target.value = value.toString();
    }
    //DOWN ARROW
    else if (e.keyCode == 40) { 
      var value: number = this.isNullOrEmpty(target.value) ? 0 : parseInt(target.value);
      value--;

      if (value < this._minValue)
        value = this._minValue;

      target.value = value.toString();
    }
  }

  private on_key_press(e: KeyboardEvent, target: HTMLInputElement): void {
    if ((e.charCode < 48 || e.charCode > 58 ) && e.keyCode != 9 && e.keyCode != 8 && !e.ctrlKey)
      e.preventDefault();
    
    var key = String.fromCharCode(e.which || e.charCode || e.keyCode);
    if (/([0-9])/.test(key)) {
        var text: string = target.value;
        
        if (text.length == this._maxCharacters && this.caret(target) == this._maxCharacters) {
          e.preventDefault();
          return;
        }

        var caret = this.caret(target);
        var output = text.substring(0, caret);

        target.value = output + key + text.substring(caret + 1);
        target.setSelectionRange(caret + 1, caret + 1);

        e.preventDefault();
    }
  }

  private caret(input: HTMLInputElement): number {
    return input.selectionStart;
  }

  private isNullOrEmpty(content: string): boolean {
    return content == null || content.length < 1;
  }

  private on_blur(): void {
    console.log('on_blur');
    
  }
}