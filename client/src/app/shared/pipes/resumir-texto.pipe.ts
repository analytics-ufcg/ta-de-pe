import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resumirTexto'
})
export class ResumirTextoPipe implements PipeTransform {

  transform(descricao: string): string {
    const tamanho = window.innerWidth <= 500 ? 20 : window.innerWidth / 45; // muda de acordo com o tamanho da tela
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
