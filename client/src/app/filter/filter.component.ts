import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  faseContratacaoSelecionada: boolean;
  fasePagamentoSelecionada: boolean;

  dataInicial: any;
  dataFinal: any;

  minDate: any;
  maxDate: any;

  constructor(private modalService: NgbModal) {
    this.faseContratacaoSelecionada = true;
    this.fasePagamentoSelecionada = true;

    this.filtro = {
      contratacao: this.faseContratacaoSelecionada,
      pagamento: this.fasePagamentoSelecionada,
      default: true
    };

    this.startDatas();
  }

  ngOnInit() {
    this.aplicarFiltro();
  }

  toggleFiltroContratacao() {
    this.faseContratacaoSelecionada = !this.faseContratacaoSelecionada;
  }

  toggleFiltroPagamento() {
    this.fasePagamentoSelecionada = !this.fasePagamentoSelecionada;
  }

  aplicarFiltro() {
    this.filtro = {
      contratacao: this.faseContratacaoSelecionada,
      pagamento: this.fasePagamentoSelecionada
    };
    this.filterChange.emit(this.filtro);

    const inicio = this.dataInicial.year + '-' + this.dataInicial.month + '-' + this.dataInicial.day;
    const final = this.dataFinal.year + '-' + this.dataFinal.month + '-' + this.dataFinal.day;

    const datas = {
      dataInicial: inicio,
      dataFinal: final
    };

    this.dateChange.emit(datas);
  }

  startDatas() {
    const hoje = new Date();

    // Data mínima para o filro
    this.minDate = { year: 2018, month: 1, day: 1 };

    // Data máxima para o filtro
    this.maxDate = {
      year: hoje.getFullYear() + 1,
      month: 12,
      day: 31
    };

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

  fecharFiltro() {
    this.aplicarFiltro();
    this.modalService.dismissAll();
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-filter' });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
