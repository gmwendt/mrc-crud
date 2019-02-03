import { Directive, ElementRef, Input, HostListener, Output, EventEmitter, HostBinding } from "@angular/core";

@Directive({
  selector: '[mrc-phone-mask]',
})
export class MrcInputPhoneMaskDirective {

  @Input() isRequired: boolean;
  @Input() phoneNumber: number;

  @Output()
  valueChange: EventEmitter<string> = new EventEmitter<string>();

  private _value: string;
  private _invalid: boolean;
  private _showErrors: boolean;
  
  constructor(private _target: ElementRef) {
  }

  private formatValue(): void {
    this._invalid = false;
    var value = this.value;

    if (value.length != 10 && value.length != 11)
      this._invalid = true;

    for (var i = 0; i < value.length; i++) {
      if (i == 0)
        this._target.nativeElement.value = '(';
      else if (i == 2)
        this._target.nativeElement.value += ') ';
      else if (i == 6 && value.length < 11)
        this._target.nativeElement.value += '-';
      else if (i == 7 && value.length >= 11)
        this._target.nativeElement.value += '-';

      this._target.nativeElement.value += value[i];      
    }
  }

  updateBorderColor(): void {
    this.borderColor = (this.showErrors && this.error) ? '#ef1508' : '#b0b0b0';
  }

  private get isNullOrEmpty(): boolean {
    var content = this._target.nativeElement.value;
    return content == null || content.length < 1;
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
    if (this.isNullOrEmpty && this.isRequired)
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

    if (this._target.nativeElement.value != value) 
      this.formatValue();
    else
      this.valueChange.emit(value);
  }

  @HostListener('keypress', [ "$event"])
  private on_key_press(e: KeyboardEvent): void {
    if ((e.charCode < 48 || e.charCode > 58 ) && e.keyCode != 9 && e.keyCode != 8 && !e.ctrlKey) {
      e.preventDefault();
      return;
    }

    if (this.value.length >= 11)
      e.preventDefault();

    switch (this.value.length) {
      case 0:
        this._target.nativeElement.value = '(';
        break;
      case 2:
        this._target.nativeElement.value += ') ';
        break;
      case 6:
        this._target.nativeElement.value += '-';
        break;
    } 

  }

  @HostListener("keyup", [ "$event"]) 
  private on_keyup(e: KeyboardEvent): void {
    this.value = this._target.nativeElement.value.replace('(', '').replace(')', '').replace(' ', '').replace('-', '');
    this.formatValue();
    this.updateBorderColor();
  }

  @HostListener('focus')
  private on_focus(): void {
    // var value: string = this._target.nativeElement.value;
    // this._target.nativeElement.value = value.replace('(', '').replace(')', '').replace(' ', '').replace('-', '');
  }
  
  @HostListener('blur')
  private on_blur(): void {
    // this.formatValue(this.value);
    // this.updateBorderColor();
  }

  @HostBinding('style.border-color')
  private borderColor: string;
}