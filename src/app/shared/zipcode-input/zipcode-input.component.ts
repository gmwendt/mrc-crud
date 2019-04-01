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

  private formatValue(value: string): string {
    var output = '';
    this._invalid = false;

    if (value.length < 8)
      this._invalid = true;

    for (var i = 0; i < value.length; i++) {
      if (i == 5)
        output += '-';

      output += value[i];      
    }

    return output;
  }
  
  private on_key_press(e: KeyboardEvent): void {
    if ((e.charCode < 48 || e.charCode > 58 ) && e.keyCode != 9 && e.keyCode != 8 && !e.ctrlKey) {
      e.preventDefault();
      return;
    }

    if (this.value.length >= 8)
      e.preventDefault();
  }
  
  private on_key_up(e: KeyboardEvent): void {
    var value: string = this._box.nativeElement.value;
   
    var zipcode = this.formatValue(this.cleanContent);
    this._box.nativeElement.value = zipcode;

    this.valueChange.emit(this.cleanContent);

    if (this.cleanContent.length == 8)
      this.updateZipcode();

    this.updateBorderColor();
  }

  private on_blur(): void {
    this.updateZipcode();
  }

  private updateZipcode(): void {
    if (this.cleanContent.length == 8) {
      this._service.getAddressInfo(this.value).then(result => {
        this._invalid = result ? false : true;
        this.zipcodeUpdate.emit(result);
        this.updateBorderColor();
      }, err => console.log(err));
    }
    else {
      this._invalid = true;
      this.zipcodeUpdate.emit(new AddressInfo(this.cleanContent, '', '', '', '', '', ''));
    }
  }

  private get isNullOrEmpty(): boolean {
    var content = this._box.nativeElement.value;
    return content == null || content.length < 1;
  }

  private get cleanContent(): string {
    var value: string = this._box.nativeElement.value;
    return value.replace('-', '');
  }
  
  @Input()
  set value(value: string) {
    if (value === undefined || value === null || !this._box || this._value == value)
      return;
      
    this._value = value;
   
    var zipcode = this.formatValue(value);
    this._box.nativeElement.value = zipcode;
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
    if (this.isNullOrEmpty && !this.isRequired)
      return null;
    else if (this.isNullOrEmpty && this.isRequired)
      return 'O campo CEP deve ser preenchido.';
    else if (this._invalid) 
      return 'CEP inválido.'
    else 
      return null;
  }

  @HostBinding('style.border-color')
  private borderColor: string;
}