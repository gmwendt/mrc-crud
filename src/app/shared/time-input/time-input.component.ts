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

  private _maxNumbers: number = 4;
  private _maxCharacters: number = 5;

  @ViewChild('box') box: ElementRef;

  private on_key_press(e: KeyboardEvent): void {
    if ((e.charCode < 48 || e.charCode > 58 ) && e.keyCode != 9 && e.keyCode != 8)
      e.preventDefault();
    
    var key = String.fromCharCode(e.which || e.charCode || e.keyCode);
    if (/([0-9])/.test(key)) {
        var text: string = this.box.nativeElement.value;
        var textNumbers = text.replace(/[^0-9]/g,"").length;

        if ((textNumbers == this._maxNumbers && this.caret == this._maxNumbers) ||
            (text.length == this._maxCharacters && this.caret == this._maxCharacters)) {
          e.preventDefault();
          return;
        }

        var output = text.substring(0, this.caret);

        this.box.nativeElement.value = output + key + text.substring(this.caret + 1);
        this.box.nativeElement.setSelectionRange(this.caret + 1, this.caret + 1);

        e.preventDefault();
    }
  }

  private get caret(): number {
    return this.box.nativeElement.selectionStart;
  }

  private on_blur(): void {
    console.log('on_blur');
    
  }
}