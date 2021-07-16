import { TipoBusca } from './../../enum/tipo-busca.enum';
import { Buscavel } from './../../models/buscavel.model';
import { Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject, merge } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  take,
  map,
  filter
} from 'rxjs/operators';

import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

import { MunicipioService } from '../../services/municipio.service';

@Component({
  selector: 'app-input-busca-geral',
  templateUrl: './input-busca-geral.component.html',
  styleUrls: ['./input-busca-geral.component.scss']
})
export class InputBuscaGeralComponent implements OnInit {

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;

  private unsubscribe = new Subject();

  public placeholder = 'Busque municípios, produtos, contratos ou fornecedores';
  public municipios: any[];
  public buscavelSelecionado: Buscavel;
  public termoPesquisado = '';

  @Input() directSearch: boolean;
  @Output() buscavelSelecionadoEvent = new EventEmitter();

  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(
    private router: Router,
    private buscaMunicipioService: MunicipioService
  ) {
    this.municipios = [];
  }

  ngOnInit() {
    this.getMunicipios();
  }

  getMunicipios() {
    this.buscaMunicipioService
      .getMunicipios()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(municipios => {
        const buscaveis: Buscavel[] = [];
        this.municipios = municipios.map((response: any) => {
          const nome = response.nome_municipio.split(' ')[0].toLowerCase();
          const tipo = (nome === 'estado') ? TipoBusca.Estado : TipoBusca.Municipio;
          buscaveis.push(new Buscavel(response.nome_municipio, tipo, response.sigla_estado, response.slug_municipio));
        });
        this.municipios = buscaveis;
      });
  }

  buscaOnEnter() {
    this.buscarOnClick(this.buscavelSelecionado);
  }

  salvarBuscavel(buscavel: Buscavel) {
    this.buscavelSelecionadoEvent.emit(buscavel);

    if (this.directSearch) {
      this.buscarOnClick(buscavel);
    }
  }

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click$.pipe(
      filter(() => !this.instance.isPopupOpen())
    );
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => {
          if (term.length >= 1) {
            const buscaveisTemp = this.municipios.filter(v =>
              v.descricao.toLowerCase().indexOf(term.toLowerCase()) > -1
            ).slice(0, 4);
            buscaveisTemp.unshift (new Buscavel(term, TipoBusca.Compra));
            buscaveisTemp.unshift (new Buscavel(term, TipoBusca.Item));
            buscaveisTemp.unshift (new Buscavel(term, TipoBusca.MunicipioBusca));
            buscaveisTemp.unshift (new Buscavel(term, TipoBusca.Fornecedor));
            return buscaveisTemp;
        } else {
          return [];
        }
      })
    );
  }
  formatter = (x: { descricao: string }) => x.descricao;

  buscarOnClick(buscavel: Buscavel) {
    if (typeof buscavel !== 'undefined' && buscavel.descricao !== '') {
      if (buscavel.tipoBusca === TipoBusca.Municipio || buscavel.tipoBusca === TipoBusca.Estado) {
        this.router.navigate(['municipio/' + buscavel.slugMunicipio]);
      } else if (buscavel.tipoBusca === TipoBusca.Compra) {
        this.router.navigate(['busca/contrato'], { queryParams: { termo: buscavel.descricao }});
      } else if (buscavel.tipoBusca === TipoBusca.Item) {
        this.router.navigate(['busca/produto'], { queryParams: { termo: buscavel.descricao }});
      } else if (buscavel.tipoBusca === TipoBusca.MunicipioBusca) {
        this.router.navigate(['busca/municipio'], { queryParams: { termo: buscavel.descricao }});
      } else if (buscavel.tipoBusca === TipoBusca.Fornecedor) {
        this.router.navigate(['busca/fornecedor'], { queryParams: { termo: buscavel.descricao }});
      }
    }
    this.limpaInputPesquisa();
  }

  limpaInputPesquisa() {
    this.termoPesquisado = null;
  }

}
