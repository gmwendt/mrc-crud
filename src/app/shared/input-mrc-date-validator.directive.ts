import { Directive, ElementRef, HostBinding, HostListener, Input  } from '@angular/core';

import * as moment from 'moment';

@Directive({
  selector: '[mrc-date-validator]',
})
export class MrcInputDateValidator {

  private _showErrors: boolean;

  @Input('mrc-date-validator') fieldName: string;

  constructor(private _target: ElementRef) {
  }

  get isNullOrEmpty(): boolean {
    var content = this._target.nativeElement.value;
    return content == null || content.length < 1;
  }

  get emptyError(): string {
    return 'O campo ' + this.fieldName + ' deve ser preenchido.';
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
    if (this.isNullOrEmpty)
      return 'O campo ' + this.fieldName + ' deve ser preenchido.';
    else if (this.isInvalid) 
      return 'Campo ' + this.fieldName +  ' inválido.';
    else 
      return null;
  }

  private get isInvalid(): boolean {
    var value: any = this._target.nativeElement.value;
    
    if (!(value instanceof moment)) 
      return true;
  }

  updateBorderColor(): void {
    let children: HTMLCollectionOf<HTMLInputElement> = this._target.nativeElement.getElementsByTagName("input");
    if (children.length == 0)
      return;

    children[0].style.borderColor = (this.showErrors && this.error) ? '#ef1508' : '#b0b0b0';
  }

  @HostBinding('style.border-color')
  private borderColor: string;

  @HostListener("ngModelChange", [ "$event"]) 
  private on_ngModelChange(value: any): void {
    this._target.nativeElement.value = value;
    this.updateBorderColor();
  }
}