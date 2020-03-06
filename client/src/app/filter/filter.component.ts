import { Component, EventEmitter, OnInit, Output, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

import { LicitacaoService } from '../shared/services/licitacao.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent implements OnInit, OnDestroy {

  @Output() filterChange = new EventEmitter<any>();

  filtro: any;
  private unsubscribe = new Subject();

  licitacaoSelecionada: string;
  empenhoSelecionado: string;
  contratoSelecionado: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private licitacaoService: LicitacaoService
  ) {
    this.licitacaoSelecionada = 'Sim';
    this.empenhoSelecionado = 'Sim';
    this.contratoSelecionado = 'Sim';

    this.filtro = {
      licitacao: this.licitacaoSelecionada,
      empenho: this.empenhoSelecionado,
      contrato: this.contratoSelecionado,
      default: true
    };
  }

  ngOnInit() {
    this.aplicarFiltro()
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'Filtros para Novidades' });
  }

  aplicarFiltro() {
    this.filtro = {
      licitacao: this.licitacaoSelecionada === 'Sim' ? true : false,
      empenho: this.empenhoSelecionado === 'Sim' ? true : false,
      contrato: this.contratoSelecionado === 'Sim' ? true : false,

    };

    this.updateUrlFiltro(this.filtro);

    this.filterChange.emit(this.filtro);
    this.modalService.dismissAll();
  }

  limparFiltro() {
    this.licitacaoSelecionada = 'Sim';
    this.empenhoSelecionado = 'Sim';
    this.contratoSelecionado = 'Sim';
    this.aplicarFiltro();
  }

  limparFiltroLicitacao() {
    this.licitacaoSelecionada = 'Sim';
    this.aplicarFiltro();
  }

  limparFiltroEmpenho() {
    this.empenhoSelecionado = 'Sim';
    this.aplicarFiltro();
  }

  limparFiltroContrato() {
    this.contratoSelecionado = 'Sim';
    this.aplicarFiltro();
  }

  private updateUrlFiltro(filtro: any) {
    const queryParams: Params = Object.assign({}, this.activatedRoute.snapshot.queryParams);

    if (filtro.licitacao !== 'Sim') {
      queryParams.licitacao = filtro.licitacao;
    } else {
      delete queryParams.licitacao;
    }

    if (filtro.empenho !== 'Sim') {
      queryParams.empenho = filtro.empenho;
    } else {
      delete queryParams.empenho;
    }

    if (filtro.contrato !== 'Sim') {
      queryParams.contrato = filtro.contrato;
    } else {
      delete queryParams.contrato;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
