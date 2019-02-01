import { Directive, ElementRef, HostBinding, HostListener, Input  } from '@angular/core';

@Directive({
  selector: '[mrc-input-required]',
})
export class MrcInputRequiredDirective {

  private _showErrors: boolean;

  @Input('mrc-input-required') fieldName: string;

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

  updateBorderColor(): void {
    this.borderColor = (this.showErrors && this.isNullOrEmpty) ? '#ef1508' : '#b0b0b0';
  }

  @HostBinding('style.border-color')
  private borderColor: string;

  @HostListener("ngModelChange", [ "$event"]) 
  private on_ngModelChange(value: string): void {
    this._target.nativeElement.value = value;
    this.updateBorderColor();
  }
}