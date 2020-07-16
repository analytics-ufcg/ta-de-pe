import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { take, map, concatMap } from 'rxjs/operators';

import * as d3 from 'd3-scale';

import { ItensContrato } from 'src/app/shared/models/itensContrato.model';
import { ItensService } from 'src/app/shared/services/itens.service';
import { TermosImportantesPipe } from 'src/app/shared/pipes/termos-importantes.pipe';
import { ResumirTextoPipe } from 'src/app/shared/pipes/resumir-texto.pipe';
import { EventoOrd } from 'src/app/shared/models/lista.model';
import { OrdenavelDirective } from 'src/app/shared/directives/ordenavel.directive';
import { ListaItensService } from 'src/app/shared/services/lista.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-info-item',
  templateUrl: './info-item.component.html',
  styleUrls: ['./info-item.component.scss'],
  providers: [
    TermosImportantesPipe,
    ResumirTextoPipe,
    ListaItensService,
    DecimalPipe
  ]
})
export class InfoItemComponent implements OnInit {

  public item: ItensContrato;

  @ViewChildren(OrdenavelDirective) cabecalhos: QueryList<OrdenavelDirective>;

  constructor(
    private activatedroute: ActivatedRoute,
    private termosPipe: TermosImportantesPipe,
    private resumirPipe: ResumirTextoPipe,
    private itensService: ItensService,
    public listaService: ListaItensService
  ) { }

  ngOnInit() {
    this.activatedroute.params.pipe(take(1)).subscribe(params => {
      this.getItemByID(params.id);
      this.getItensSemelhantesByID(params.id);
    });
  }

  getItemByID(id: any) {
    this.itensService
      .get(id)
      .pipe(
        concatMap(item => {
          const termos = this.termosPipe.transform(item.ds_item);
          return this.itensService
            .getMediaItensSemelhantes(item, termos);
        })
      )
      .subscribe(item => {
        item.ds_item_resumido = this.resumirPipe.transform(item.ds_item);
        this.item = item;
      });
  }

  getItensSemelhantesByID(id: any) {
    this.listaService.dados$ = this.itensService
      .get(id)
      .pipe(
        concatMap(item => {
          const termos = this.termosPipe.transform(item.ds_item);
          return this.itensService
            .getItensSimilares(termos, item.dt_inicio_vigencia)
            .pipe(
              // filtra dos semelhantes o item atual
              map(itensSemelhantes => itensSemelhantes.filter(itemSemelhante => itemSemelhante.id_item_contrato !== item.id_item_contrato))
            );
        }),
        map(itens => {
          // cria resumo da descrição
          itens.map(item => item.ds_item_resumido = this.resumirPipe.transform(item.ds_item));
          // itens ordenados pelo preço
          itens.sort((i1, i2) => i1.vl_item_contrato - i2.vl_item_contrato);
          return itens;
        })
      );
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

  defineCorFundo(valor: number): string {
    const cor: any = d3.scaleLinear()
    .domain([-1, 0, 1])
    .range(['#72a5b6', '#ffffff', '#d7856c']);
    return cor(valor);
  }

  defineCor(valor: number): string {
    return (valor >= 0.7 || valor <= -0.7) ? 'white' : 'black';
  }
}
