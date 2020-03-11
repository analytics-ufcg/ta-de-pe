import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent implements OnInit, OnDestroy {

  @Output() filterChange = new EventEmitter<any>();

  filtro: any;
  private unsubscribe = new Subject();

  licitacaoSelecionada: boolean;
  empenhoSelecionado: boolean;
  contratoSelecionado: boolean;

  constructor() {
    this.licitacaoSelecionada = true;
    this.empenhoSelecionado = true;
    this.contratoSelecionado = true;

    this.filtro = {
      licitacao: this.licitacaoSelecionada,
      empenho: this.empenhoSelecionado,
      contrato: this.contratoSelecionado,
      default: true
    };
  }

  ngOnInit() {
    this.aplicarFiltro();
  }

  toggleFiltroLicitacao() {
    this.licitacaoSelecionada = !this.licitacaoSelecionada;
    this.aplicarFiltro();
  }

  toggleFiltroEmpenho() {
    this.empenhoSelecionado = !this.empenhoSelecionado;
    this.aplicarFiltro();
  }

  toggleFiltroContrato() {
    this.contratoSelecionado = !this.contratoSelecionado;
    this.aplicarFiltro();
  }

  aplicarFiltro() {
    this.filtro = {
      licitacao: this.licitacaoSelecionada,
      empenho: this.empenhoSelecionado,
      contrato: this.contratoSelecionado
    };
    this.filterChange.emit(this.filtro);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
