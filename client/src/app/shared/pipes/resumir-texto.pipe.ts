import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resumirTexto'
})
export class ResumirTextoPipe implements PipeTransform {

  transform(descricao: string): string {
    let tamanho = 20;
    // muda de acordo com o tamanho da tela
    if (window.innerWidth >= 1500) {
      tamanho = window.innerWidth / 55;
    } else if (window.innerWidth >= 500) {
      tamanho = window.innerWidth / 25;
    }
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
