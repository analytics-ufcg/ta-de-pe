import { EventoOrd } from 'src/app/shared/models/lista.model';
import { OrdenavelDirective } from 'src/app/shared/directives/ordenavel.directive';
import { DecimalPipe } from '@angular/common';
import { ListaItensService } from 'src/app/shared/services/lista.service';
import { ResumirTextoPipe } from 'src/app/shared/pipes/resumir-texto.pipe';
import { TermosImportantesPipe } from 'src/app/shared/pipes/termos-importantes.pipe';
import { map, concatMap } from 'rxjs/operators';
import { ItensService } from 'src/app/shared/services/itens.service';
import { ItensContrato } from 'src/app/shared/models/itensContrato.model';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { BehaviorSubject, Observable } from 'rxjs';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@Component({
  selector: 'app-busca-item',
  templateUrl: './busca-item.component.html',
  styleUrls: ['./busca-item.component.scss'],
  providers: [
    TermosImportantesPipe,
    ResumirTextoPipe,
    ListaItensService,
    DecimalPipe,
    PipesModule,
    NgxPaginationModule
  ]
})
export class BuscaItemComponent implements OnInit {

  public loading$ = new BehaviorSubject<boolean>(true);
  public termo = '';
  public p = 1;

  @ViewChildren(OrdenavelDirective) cabecalhos: QueryList<OrdenavelDirective>;

  constructor(
    private activatedroute: ActivatedRoute,
    private resumirPipe: ResumirTextoPipe,
    private itensService: ItensService,
    public listaService: ListaItensService
  ) {
    this.listaService.colunaOrd = 'vl_item_contrato';
    this.listaService.direcaoOrd = 'desc';
  }

  ngOnInit() {
    this.activatedroute.queryParamMap.subscribe(params => {
      this.termo = params.get('termo');
      this.listaService.dados$ = this.itensService
      .buscar(this.termo)
      .pipe(
        map(itens => {
          // cria resumo da descrição
          itens.map(item => item.ds_item_resumido = this.resumirPipe.transform(item.ds_item));
          // itens ordenados pelo preço
          itens.sort((i1, i2) => i1.vl_item_contrato - i2.vl_item_contrato);
          return itens;
        })
      );
      this.listaService.colunaOrd = 'vl_item_contrato';
      this.listaService.direcaoOrd = 'desc';
      this.loading$.next(false);
    });
  }

  pageChange(p: number) {
    this.p = p;
  }

  onChange() {
    const isChecked = false;
    //this.isChecked = !this.isChecked;

    const itens = [];
    itens.push(this.listaService.dados$)
    this.listaService.dadosProcessados$.forEach(dado => {
      console.log(dado);
    });
    console.log(itens);
  }

  onOrdenar({coluna, direcao}: EventoOrd) {
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
