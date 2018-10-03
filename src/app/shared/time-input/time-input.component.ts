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
    console.log(e);
    var text: string = this.box.nativeElement.innerHTML;
    console.log(text);
    console.log(this.caret);
  }

  private get caret(): number {
    return this.box.nativeElement.selectionStart;
  }

  private on_blur(): void {
    console.log('on_blur');
    
  }
}