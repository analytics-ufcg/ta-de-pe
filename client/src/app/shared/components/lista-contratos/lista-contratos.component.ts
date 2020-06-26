import { Component, OnInit, Input, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ContratoLicitacao } from '../../models/contratoLicitacao.model';

@Component({
  selector: 'app-lista-contratos',
  templateUrl: './lista-contratos.component.html',
  styleUrls: ['./lista-contratos.component.scss'],
  providers: [DecimalPipe]
})
export class ListaContratosComponent implements OnInit {
  @Input() contratos: ContratoLicitacao[];
  @Input() isLoading: boolean;

  contratos$: Observable<ContratoLicitacao[]>;
  filtro = new FormControl('');

  constructor(pipe: DecimalPipe) {
    this.contratos$ = this.filtro.valueChanges.pipe(
      startWith(''),
      map(texto => this.buscar(texto, pipe))
    );
  }

  ngOnInit() {
    console.log(this.contratos$);
  }

  buscar(texto: string, pipe: PipeTransform): ContratoLicitacao[] {
    console.log(this.contratos$);
    if (this.contratos) {
      return this.contratos.filter(contrato => {
        const termo = texto.toUpperCase();
        return pipe.transform(contrato.nr_contrato).includes(termo)
            || contrato.contratoFornecedor.nm_pessoa.includes(termo)
            || pipe.transform(contrato.nr_documento_contratado).includes(termo);
      });
    }
  }
}
