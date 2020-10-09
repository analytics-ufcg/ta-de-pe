import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

import { ContratoService } from 'src/app/shared/services/contrato.service';
import { ContratoLicitacao } from 'src/app/shared/models/contratoLicitacao.model';

@Component({
  selector: 'app-busca-compra',
  templateUrl: './busca-compra.component.html',
  styleUrls: ['./busca-compra.component.scss']
})
export class BuscaCompraComponent implements OnInit {

  public contratos$: Observable<ContratoLicitacao[]>;
  public loading$ = new BehaviorSubject<boolean>(true);
  public termo = '';

  constructor(
    private contratoService: ContratoService,
    private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedroute.queryParamMap.subscribe(params => {
      this.termo = params.get('termo');
      this.contratos$ = this.contratoService.buscar(this.termo);
      this.loading$.next(false);
    });
  }

}
