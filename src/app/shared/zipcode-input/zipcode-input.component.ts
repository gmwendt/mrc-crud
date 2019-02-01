import { Component, ViewChild, ViewEncapsulation, ElementRef, EventEmitter, Input, Output, HostBinding } from "@angular/core";

import { AddressInfo } from "../../core/common/types";
import { ZipcodeService } from "../../core/zipcode.service";

@Component({
  selector: 'zipcode-input',
  templateUrl: './zipcode-input.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ZipcodeInputComponent {

  @ViewChild('box') _box: ElementRef;

  @Input() isRequired: boolean;

  @Output()
  valueChange: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  zipcodeUpdate: EventEmitter<AddressInfo> = new EventEmitter<AddressInfo>();

  private _value: string;
  private _showErrors: boolean;
  private _invalid: boolean;

  constructor(private _service: ZipcodeService) {

  }
  
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
      this._service.getAddressInfo(test).then(result => {
        this._invalid = result ? false : true;
        this.zipcodeUpdate.emit(result);
        this.updateBorderColor();
      }, err => console.log(err));
    }
    else {
      this._invalid = true;
      this.zipcodeUpdate.emit();
    }
  }

  private on_focus(): void {
    var test: string = this._box.nativeElement.value;
    if (test.includes('-') && test.length == 9) 
    this._box.nativeElement.value = test.replace('-', '');
  }

  private get isNullOrEmpty(): boolean {
    var content = this._box.nativeElement.value;
    return content == null || content.length < 1;
  }
  
  @Input()
  set value(value: string) {
    if (value === undefined || value === null || !this._box || this._value == value)
      return;

    if (this._box.nativeElement.value != value && value.length == 8)
      this._box.nativeElement.value = value.slice(0, 5) + '-' + value.slice(5, 8);

    this._value = value;
    this.valueChange.emit(value);
  }

  get value(): string {
    return this._value;
  }

  get showErrors(): boolean {
    return this._showErrors;
  }

  set showErrors(value: boolean) {
    if (value == this._showErrors)
      return;

    this._showErrors = value;
    this.updateBorderColor();
  }

  updateBorderColor(): void {
    this._box.nativeElement.style.borderColor = (this.showErrors && this.error) ? '#ef1508' : '#b0b0b0';
  }

  get error(): string {
    if (this.isNullOrEmpty && this.isRequired)
      return 'O campo CEP deve ser preenchido.';
    else if (this._invalid) 
      return 'CEP inválido.'
    else 
      return null;
  }

  @HostBinding('style.border-color')
  private borderColor: string;
}