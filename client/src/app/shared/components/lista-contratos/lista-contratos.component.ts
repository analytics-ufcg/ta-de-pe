import { Component, Input, OnChanges, SimpleChanges, ViewChildren, QueryList, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { ContratoLicitacao } from '../../models/contratoLicitacao.model';
import { EventoOrd } from '../../models/lista.model';
import { ListaContratosService } from '../../services/lista.service';
import { OrdenavelDirective } from '../../directives/ordenavel.directive';

@Component({
  selector: 'app-lista-contratos',
  templateUrl: './lista-contratos.component.html',
  styleUrls: ['./lista-contratos.component.scss'],
  providers: [ListaContratosService, DecimalPipe],
})
export class ListaContratosComponent implements OnChanges {
  @Input() contratos$: Observable<ContratoLicitacao[]>;

  public p = 1;

  @ViewChildren(OrdenavelDirective) cabecalhos: QueryList<OrdenavelDirective>;

  constructor(public listaService: ListaContratosService) {
    this.listaService.colunaOrd = 'dt_inicio_vigencia';
    this.listaService.direcaoOrd = 'desc';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.listaService.dados$ = this.contratos$;
  }

  onOrdenar({coluna, direcao}: EventoOrd) {
    // Reseta outros cabeçalhos
    this.cabecalhos.forEach(cab => {
      if (cab.ordenavel !== coluna) {
        cab.direcao = '';
        cab.ordAsc = false;
        cab.ordDesc = false;
      }
    });

    this.listaService.colunaOrd = coluna;
    this.listaService.direcaoOrd = direcao;
  }

  pageChange(p: number) {
    this.p = p;
  }
}
