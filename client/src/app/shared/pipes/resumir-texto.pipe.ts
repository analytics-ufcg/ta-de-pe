import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resumirTexto'
})
export class ResumirTextoPipe implements PipeTransform {

  transform(descricao: string, tamanho: number = 40): string {
    const split = descricao.split(/\s+|:|,/);
    let str = '';
    let i = 0;
    do {
      str += split[i] + ' ';
      i++;
    } while (str.length < tamanho && typeof split[i] !== 'undefined');
    return str.substr(0, str.length - 1);
  }

}
