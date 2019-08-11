import { Pipe, PipeTransform, } from '@angular/core';

@Pipe({ name: 'brlFormat' })
export class BrlFormatPipe implements PipeTransform {
  transform(value: any): any {
    if (typeof value === 'number' && !isNaN(value)) {
      let num = parseFloat(value.toFixed(2));
      let strNum = 'R$ ' + num.toLocaleString('pt-BR');
      
      return strNum.indexOf(',') < 0 ? strNum + ',00' : strNum;
    }

    return value;
  }
}