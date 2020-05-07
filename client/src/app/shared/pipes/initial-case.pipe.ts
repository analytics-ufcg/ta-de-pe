import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initialcase'
})
export class InitialCasePipe implements PipeTransform {

  transform(value: string): any {
    if (!value) { return value; }
    if (typeof value !== 'string') {
      return value;
    }
    return value.substr(0, 1).toUpperCase() + value.substr(1, value.length).toLowerCase();
  }

}
