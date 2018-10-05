import { Component, ElementRef, Input, ViewChild, ViewEncapsulation, } from "@angular/core";

@Component({
  selector: 'time-input',
  templateUrl: './time-input.component.html',
  //styleUrls: ['./time-input.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TimeInputComponent {

  @Input()
  value: string = "";

  @ViewChild('box') box: ElementRef;

  private on_key_press(e: KeyboardEvent): void {
    if ((e.charCode < 48 || e.charCode > 58 ) && e.keyCode != 9 && e.keyCode != 8)
      e.preventDefault();
    
    var key = String.fromCharCode(e.which || e.charCode || e.keyCode);
    if (/([0-9])/.test(key)) {
        var text = this.box.nativeElement.value;
        var caret = this.caret;
        var output = text.substring(0, caret);
        this.box.nativeElement.value = output + key + text.substring(caret + 1);
        this.box.nativeElement.setSelectionRange(caret + 1, caret + 1);//setCaretPosition(this, caret + 1);
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