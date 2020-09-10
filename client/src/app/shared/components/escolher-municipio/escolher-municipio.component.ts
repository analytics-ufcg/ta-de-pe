import { TipoBusca } from './../../enum/tipo-busca.enum';
import { Buscavel } from './../../models/buscavel.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
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
  selector: 'app-escolher-municipio',
  templateUrl: './escolher-municipio.component.html',
  styleUrls: ['./escolher-municipio.component.scss']
})
export class EscolherMunicipioComponent implements OnInit, OnDestroy {

  public buscavelSelecionado: Buscavel;
  private unsubscribe = new Subject();

  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(private router: Router,
              private userService: UserService) {}

  ngOnInit() { this.getMunicipioSalvo(); }

  buscarOnClick() {
    if (typeof this.buscavelSelecionado !== 'undefined' && this.buscavelSelecionado.descricao !== '') {
      if (this.buscavelSelecionado.tipoBusca === TipoBusca.Municipio ) {
        this.router.navigate(['municipio']);
      } else if (this.buscavelSelecionado.tipoBusca === TipoBusca.Compra ) {
        console.log (this.buscavelSelecionado);
      }
    }
  }

  getMunicipioSalvo() {
    this.userService
      .getMunicipioEscolhido()
      .subscribe(municipio => {
        if (municipio) {
          this.buscavelSelecionado = new Buscavel(municipio, TipoBusca.Municipio);
        }
      });
  }

  reciverSelecionado(buscavelSelecionado) {
    this.buscavelSelecionado = buscavelSelecionado;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
