import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'termosImportantes'
})
export class TermosImportantesPipe implements PipeTransform {

  transform(texto: string, n: number = 3): string[] {
    const termos = texto
      .split(/\s+|:|-/)
      .slice(0, n)
      .map(palavra => palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ''))
      .filter(i => i !== '');
    return [termos[0], termos.slice(0, 2).join(' & '), termos.join(' & ')];
  }

}
