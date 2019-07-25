import { Pipe, PipeTransform, } from '@angular/core';

@Pipe({ name: 'decimalCases' })
export class DecimalCasesPipe implements PipeTransform {
  transform(value: any, decimalCases: number = 0): any {
    let pow = Math.pow(10, decimalCases);

    if (typeof value === 'number' && !isNaN(value)) 
      return Math.round(value * pow) / pow;

    return value;
  }
}