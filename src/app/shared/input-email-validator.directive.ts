import { Directive, ElementRef, Input, HostListener, Output, EventEmitter, HostBinding } from "@angular/core";

@Directive({
  selector: '[mrc-email-validator]',
})
export class MrcInputEmailValidatorDirective {

  @Input() isRequired: boolean;

  //private _invalid: boolean;
  private _showErrors: boolean;

  constructor(private _target: ElementRef) {
  }

  updateBorderColor(): void {
    this.borderColor = (this.showErrors && this.error) ? '#ef1508' : '#b0b0b0';
  }

  private get isInvalid(): boolean {
    var value: string = this._target.nativeElement.value;

    if (!value.includes('@'))
      return true;

    var domain = value.split('@')[1];
    if (!domain || domain.length == 0)
      return true;

    return false;
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
      return 'O campo E-mail deve ser preenchido.';
    else if (this.isInvalid && !this.isNullOrEmpty) 
      return 'E-mail inválido.'
    else 
      return null;
  }

  @HostListener('keyup', [ "$event"])
  private on_key_up(e: KeyboardEvent): void {
    this.updateBorderColor();
  }

  @HostBinding('style.border-color')
  private borderColor: string;
}