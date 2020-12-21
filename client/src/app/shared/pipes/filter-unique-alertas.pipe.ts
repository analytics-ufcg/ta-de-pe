import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUniqueAlertas'
})
export class FilterUniqueAlertasPipe implements PipeTransform {

  transform(items: any[]): any {
    if (!items) {
      return items;
    }

    const uniqueItens: any[] = [];
    items.forEach(item => {
      let contains = false;
      uniqueItens.forEach(itemUtil => {
        if (item.id_tipo === itemUtil.id_tipo) {
          contains = !contains;
        }
      });

      if (!contains) {
        uniqueItens.push(item);
      }
    });

    return uniqueItens;
  }

}
