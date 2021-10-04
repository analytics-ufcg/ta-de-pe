import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCpfCnpj'
})
export class FormatCpfCnpjPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (!value) { return value; }
    const cnpjCpf = value.replace(/\D/g, '');
    const tipoPessoa = args[0];

    if (cnpjCpf.length === 11) {
      return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3-\$4');
    } else if (cnpjCpf.length === 14) {
      return cnpjCpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '\$1.\$2.\$3/\$4-\$5');
    } else if (cnpjCpf.length === 6 && tipoPessoa === 'F') {
      return cnpjCpf.replace(/(\d{3})(\d{3})/g, '***.\$1.\$2-**');
    }

    return cnpjCpf;
  }
}
