import { TipoBusca } from './../../enum/tipo-busca.enum';
import { Buscavel } from './../../models/buscavel.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

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

  constructor(private router: Router) {}

  ngOnInit() { }

  buscarOnClick() {
    if (typeof this.buscavelSelecionado !== 'undefined' && this.buscavelSelecionado.descricao !== '') {
      if (this.buscavelSelecionado.tipoBusca === TipoBusca.Municipio ) {
        this.router.navigate(['municipio']);
      } else if (this.buscavelSelecionado.tipoBusca === TipoBusca.Compra ) {
        this.router.navigate(['busca/contrato'], { queryParams: { termo: this.buscavelSelecionado.descricao }});
      } else if (this.buscavelSelecionado.tipoBusca === TipoBusca.Item ) {
        this.router.navigate(['busca/produto'], { queryParams: { termo: this.buscavelSelecionado.descricao }});
      }
    }
  }

  reciverSelecionado(buscavelSelecionado) {
    this.buscavelSelecionado = buscavelSelecionado;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
