import { Directive, ElementRef, Input, HostListener, Output, EventEmitter, HostBinding } from "@angular/core";

@Directive({
  selector: '[mrc-phone-mask]',
})
export class MrcInputPhoneMaskDirective {

  @Input() isRequired: boolean;

  @Output()
  valueChange: EventEmitter<string> = new EventEmitter<string>();

  private _value: string;
  private _invalid: boolean;
  private _showErrors: boolean;
  
  constructor(private _target: ElementRef) {
  }

  private formatValue(value: string): string {
    var output = '';
    this._invalid = false;

    if (value.length != 10 && value.length != 11)
      this._invalid = true;

    for (var i = 0; i < value.length; i++) {
      if (i == 0)
        output = '(';
      else if (i == 2)
        output += ') ';
      else if (i == 6 && value.length < 11)
        output += '-';
      else if (i == 7 && value.length >= 11)
        output += '-';

      output += value[i];      
    }

    return output;
  }

  updateBorderColor(): void {
    this.borderColor = (this.showErrors && this.error) ? '#ef1508' : '#b0b0b0';
  }

  private get isNullOrEmpty(): boolean {
    var content = this._target.nativeElement.value;
    return content == null || content.length < 1;
  }

  private get cleanContent(): string {
    var value: string = this._target.nativeElement.value;
    return value.replace('(', '').replace(')', '').replace(' ', '').replace('-', '');
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

  get error(): string {
    if (this.isNullOrEmpty && !this.isRequired)
      return null;
    else if (this.isNullOrEmpty && this.isRequired)
      return 'O campo Telefone deve ser preenchido.';
    else if (this._invalid && !this.isNullOrEmpty) 
      return 'Telefone inválido.'
    else 
      return null;
  }

  @Input() 
  get value(): string {
    return this._value;
  }

  set value(value: string) {
    if (value === undefined || value === null || this._value == value)
      return;

    this._value = value;

    var phoneNum = this.formatValue(value);
    this._target.nativeElement.value = phoneNum;
  }

  @HostListener('keypress', [ "$event"])
  private on_key_press(e: KeyboardEvent): void {
    if ((e.charCode < 48 || e.charCode > 58 ) && e.keyCode != 9 && e.keyCode != 8 && !e.ctrlKey) {
      e.preventDefault();
      return;
    }

    if (this.cleanContent.length > 10) 
      e.preventDefault();
  }

  @HostListener('keyup', [ "$event"])
  private on_key_up(e: KeyboardEvent): void {
    var value: string = this._target.nativeElement.value;
   
    var phoneNum = this.formatValue(this.cleanContent);
    this._target.nativeElement.value = phoneNum;

    this.valueChange.emit(this.cleanContent);
    this.updateBorderColor();
  }

  @HostBinding('style.border-color')
  private borderColor: string;
}