import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent implements OnInit, OnDestroy {

  @Output() filterChange = new EventEmitter<any>();
  @Output() dateChange = new EventEmitter<any>();

  filtro: any;
  private unsubscribe = new Subject();

  licitacaoSelecionada: boolean;
  empenhoSelecionado: boolean;
  contratoSelecionado: boolean;

  dataInicial: any;
  dataFinal: any;

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

    this.startDatas();
  }

  ngOnInit() {
    this.aplicarFiltro();
    this.aplicarDateChange();
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

  startDatas() {
    const hoje = new Date();
    this.dataFinal = {
      year: hoje.getFullYear(),
      month: hoje.getMonth() + 1,
      day: hoje.getDate()
    };
    const doisAnosAtras = new Date(hoje.setFullYear(new Date().getFullYear() - 2)); // dois anos atrás

    this.dataInicial = {
      year: doisAnosAtras.getFullYear(),
      month: doisAnosAtras.getMonth() + 1,
      day: doisAnosAtras.getDate()
    };
  }

  aplicarDateChange() {
    const inicio = this.dataInicial.year + '-' + this.dataInicial.month + '-' + this.dataInicial.day;
    const final = this.dataFinal.year + '-' + this.dataFinal.month + '-' + this.dataFinal.day;

    const datas = {
      dataInicial: inicio,
      dataFinal: final
    };

    this.dateChange.emit(datas);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
