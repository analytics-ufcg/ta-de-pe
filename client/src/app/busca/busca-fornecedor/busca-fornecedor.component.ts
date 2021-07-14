import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DecimalPipe } from '@angular/common';

import { BehaviorSubject } from 'rxjs';

import { ListaFornecedoresService } from 'src/app/shared/services/lista.service';
import { FornecedorService } from 'src/app/shared/services/fornecedor.service';
import { EventoOrd } from 'src/app/shared/models/lista.model';
import { OrdenavelDirective } from 'src/app/shared/directives/ordenavel.directive';

@Component({
  selector: 'app-busca-fornecedor',
  templateUrl: './busca-fornecedor.component.html',
  styleUrls: ['./busca-fornecedor.component.scss'],
  providers: [
    DecimalPipe,
    ListaFornecedoresService
  ]
})
export class BuscaFornecedorComponent implements OnInit {

  public loading$ = new BehaviorSubject<boolean>(true);
  public termo = '';

  @ViewChildren(OrdenavelDirective) cabecalhos: QueryList<OrdenavelDirective>;

  constructor(
    private activatedroute: ActivatedRoute,
    private fornecedorService: FornecedorService,
    public listaService: ListaFornecedoresService,
  ) {
    this.listaService.colunaOrd = 'nm_fornecedor';
    this.listaService.direcaoOrd = 'desc';
  }

  ngOnInit() {
    this.activatedroute.queryParamMap.subscribe(params => {
      this.termo = params.get('termo');
      this.listaService.dados$ = this.fornecedorService
        .buscar(this.termo);

      this.listaService.colunaOrd = 'nm_fornecedor';
      this.listaService.direcaoOrd = 'desc';
      this.loading$.next(false);
    });
  }

  onOrdenar({ coluna, direcao }: EventoOrd) {
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

}
