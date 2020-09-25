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
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-input-busca-geral',
  templateUrl: './input-busca-geral.component.html',
  styleUrls: ['./input-busca-geral.component.scss']
})
export class InputBuscaGeralComponent implements OnInit {

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;

  private unsubscribe = new Subject();

  public placeholder = 'Busque por compras ou municípios';
  public municipios: any[];
  public buscavelSelecionado: Buscavel;

  @Input() directSearch: boolean;
  @Output() buscavelSelecionadoEvent = new EventEmitter();

  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(
    private router: Router,
    private buscaMunicipioService: MunicipioService,
    private userService: UserService
  ) {
    this.municipios = [];
  }

  ngOnInit() {
    this.getMunicipios();
    this.getMunicipioSalvo();
  }

  getMunicipios() {
    this.buscaMunicipioService
      .getMunicipios()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(municipios => {
        const buscaveis: Buscavel[] = [];
        this.municipios = municipios.map((response: any) =>
          buscaveis.push(new Buscavel(response.nome_municipio, TipoBusca.Municipio))
        );
        this.municipios = buscaveis;
      });
  }

  getMunicipioSalvo() {
    this.userService
      .getMunicipioEscolhido()
      .pipe(take(1))
      .subscribe(municipio => {
        this.buscavelSelecionado = new Buscavel(municipio, TipoBusca.Municipio);
      });
  }

  salvarBuscavel(buscavel: Buscavel) {
    this.buscavelSelecionadoEvent.emit(buscavel);
    if (buscavel.tipoBusca === TipoBusca.Municipio) {
      this.userService.setMunicipioEscolhido(buscavel.descricao);
    }

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
      if (buscavel.tipoBusca === TipoBusca.Municipio ) {
        this.router.navigate(['municipio']);
      } else if (buscavel.tipoBusca === TipoBusca.Compra ) {
        this.router.navigate(['busca'], { queryParams: { termo: buscavel.descricao }});
      }
    }
  }


}