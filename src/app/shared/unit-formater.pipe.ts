import { Pipe, PipeTransform, } from '@angular/core';

@Pipe({ name: 'unitFormater' })
export class UnitFormaterPipe implements PipeTransform {
  transform(value: any, unit?: string, decimalCases?: string): any {
    let _unit = '';
    let _decimalCases = 0;

    if (unit)
      _unit = ' ' + unit;

    if (decimalCases)
      _decimalCases = parseInt(decimalCases);

    let pow = Math.pow(10, _decimalCases);

    if (typeof value === 'number') {
      if (!isNaN(value))
        return (Math.round(value * pow) / pow).toLocaleString() + _unit;
      else
        return value;
    }

    return value;
  }
}