import { Pipe, PipeTransform, } from '@angular/core';

@Pipe({ name: 'localeString' })
export class LocaleStringPipe implements PipeTransform {
  transform(value: any): any {

    if (typeof value === 'number') {
      if (!isNaN(value))
        return value.toLocaleString();
      else
        return value;
    }
    else if (value instanceof Date) {
      return value.toLocaleString();
    }

    return value;
  }
}