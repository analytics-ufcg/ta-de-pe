import { Component, OnInit, Input, PipeTransform, OnChanges, SimpleChanges } from '@angular/core';
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
export class ListaContratosComponent implements OnInit, OnChanges {
  @Input() contratos: ContratoLicitacao[];
  @Input() isLoading: boolean;

  contratos$: Observable<ContratoLicitacao[]>;
  filtro = new FormControl();

  constructor(private pipe: DecimalPipe) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.contratos$ = this.filtro.valueChanges.pipe(
      startWith(''),
      map(texto => this.buscar(texto, this.pipe))
    );
  }

  ngOnInit() {
  }

  buscar(texto: string, pipe: PipeTransform): ContratoLicitacao[] {
    if (this.contratos) {
      return this.contratos.filter(contrato => {
        const termo = texto.toLowerCase();
        return pipe.transform(contrato.nr_contrato).includes(termo)
            || contrato.contratoFornecedor.nm_pessoa.toLowerCase().includes(termo)
            || pipe.transform(contrato.nr_documento_contratado).includes(termo);
      });
    }
  }
}
