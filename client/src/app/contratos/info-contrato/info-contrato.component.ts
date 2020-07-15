import { Component, OnInit, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import * as d3 from 'd3-scale';

import { Subject, forkJoin, BehaviorSubject, Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { ContratoLicitacao } from 'src/app/shared/models/contratoLicitacao.model';
import { ItensContrato } from 'src/app/shared/models/itensContrato.model';
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
export class InfoContratoComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject();

  public loading$ = new BehaviorSubject<boolean>(true);
  public itensContrato$: Observable<any[]>;

  @ViewChildren(OrdenavelDirective) cabecalhos: QueryList<OrdenavelDirective>;

  public contrato: ContratoLicitacao;
  public itemSelecionado: ItensContrato;
  public radioGroupForm: FormGroup;

  constructor(
    private activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private contratoService: ContratoService,
    private itensService: ItensService,
    private resumirPipe: ResumirTextoPipe,
    private termosPipe: TermosImportantesPipe,
    public listaService: ListaItensService
  ) { }

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
      this.loading$.next(false);
    });
  }

  getItensByContrato(id: string) {
    this.listaService.dados$ = this.itensService
      .getByContrato(id)
      .pipe(
        map(itensContrato => {
          // Calcula valores da tabela de itens
          itensContrato.map(item => {
            item.ds_item_resumido = this.resumirPipe.transform(item.ds_item);
            const termos = this.termosPipe.transform(item.ds_item);
            this.itensService.getMediaItensSemelhantes(termos, item.dt_inicio_vigencia)
              .then(res => {
                item.mediana_valor = res.mediana;
                item.itensSemelhantes = res.itensOrdenados;
                item.percentual_vs_estado = (item.vl_item_contrato - res.mediana) / res.mediana;
                item.percentual_vs_estimado = (item.vl_item_contrato - item.vl_unitario_estimado)
                  / item.vl_unitario_estimado;
              });
          });
          return itensContrato;
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

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
