import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import * as d3 from 'd3-scale';

import { forkJoin, BehaviorSubject, from } from 'rxjs';
import { take, map, concatMap, mergeMap, reduce, tap } from 'rxjs/operators';

import { ContratoLicitacao } from 'src/app/shared/models/contratoLicitacao.model';
import { ContratoService } from 'src/app/shared/services/contrato.service';
import { ItensService } from 'src/app/shared/services/itens.service';
import { ResumirTextoPipe } from 'src/app/shared/pipes/resumir-texto.pipe';
import { TermosImportantesPipe } from 'src/app/shared/pipes/termos-importantes.pipe';
import { ListaItensService } from 'src/app/shared/services/lista.service';
import { EventoOrd } from 'src/app/shared/models/lista.model';
import { OrdenavelDirective } from 'src/app/shared/directives/ordenavel.directive';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-info-contrato',
  templateUrl: './info-contrato.component.html',
  styleUrls: ['./info-contrato.component.scss'],
  providers: [
    ResumirTextoPipe,
    TermosImportantesPipe,
    ListaItensService,
    DecimalPipe
  ]
})
export class InfoContratoComponent implements OnInit {

  public loading$ = new BehaviorSubject<boolean>(true);
  public contrato: ContratoLicitacao;
  public radioGroupForm: FormGroup;

  @ViewChildren(OrdenavelDirective) cabecalhos: QueryList<OrdenavelDirective>;

  constructor(
    private activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private contratoService: ContratoService,
    private itensService: ItensService,
    private resumirPipe: ResumirTextoPipe,
    private termosPipe: TermosImportantesPipe,
    public listaService: ListaItensService
  ) {
    this.listaService.colunaOrd = 'percentual_vs_estado';
    this.listaService.direcaoOrd = 'desc';
  }

  ngOnInit() {
    this.activatedroute.params.pipe(take(1)).subscribe(params => {
      this.getItensByContrato(params.id);
      this.getContratoByID(params.id);
    });
    this.radioGroupForm = this.formBuilder.group({
      showTotal: false
    });
  }

  getContratoByID(id: string) {
    forkJoin(
      this.contratoService.get(id),
      this.itensService.getByContrato(id)
    ).subscribe(data => {
      this.contrato = data[0];
      const itensContrato = data[1];

      // Calcula valor contratado
      this.contrato.valor_contratado = itensContrato.reduce((sum, item) => {
        return sum + (item.vl_item_contrato * item.qt_itens_contrato);
      }, 0);

      // Calcula valor estimado do contrato
      this.contrato.valor_estimado = itensContrato.reduce((sum, item) => {
        return sum + (item.vl_unitario_estimado * item.qt_itens_contrato);
      }, 0);
    });
  }

  getItensByContrato(id: string) {
    this.listaService.dados$ = this.itensService
      .getByContrato(id)
      .pipe(
        concatMap(itensContrato => {
          // Calcula valores da tabela de itens
          return from(itensContrato)
            .pipe(
              mergeMap(item => {
                item.ds_item_resumido = this.resumirPipe.transform(item.ds_item);
                const termos = this.termosPipe.transform(item.ds_item);
                return this.itensService.getMediaItensSemelhantes(item, termos)
                  .pipe(
                    map(itemComMediana => {
                      item = itemComMediana;
                      // Se não houver itens similares, o valor da mediana será NaN
                      // Este trecho atribui um valor bem pequeno para que todos os itens sem semelhantes fiquem ordenados primeiro
                      if (isNaN(item.mediana_valor) || (item.itensSemelhantes && item.itensSemelhantes.length === 1)) {
                        item.mediana_valor = -1; // Não existem itens com preços negativos
                        item.percentual_vs_estado = -1000000000; // Valor pequeno e improvável de ter algum item com preço menor
                      } else {
                        item.percentual_vs_estado = (item.vl_item_contrato - item.mediana_valor) / item.mediana_valor;
                      }

                      if (item.vl_unitario_estimado) {
                        item.percentual_vs_estimado = (item.vl_item_contrato - item.vl_unitario_estimado)
                          / item.vl_unitario_estimado;
                      }
                      return item;
                    })
                  );
              }),
              reduce((acc: Array<any>, element: any) => [...acc, element], [])
            );
        }),
        tap(() => this.loading$.next(false))
      );
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
