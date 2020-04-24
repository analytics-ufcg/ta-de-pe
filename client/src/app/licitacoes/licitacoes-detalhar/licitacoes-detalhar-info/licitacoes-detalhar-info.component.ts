import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { nest } from 'd3-collection';

import { Licitacao } from 'src/app/shared/models/licitacao.model';
import { LicitacaoService } from 'src/app/shared/services/licitacao.service';
import { NovidadeService } from 'src/app/shared/services/novidade.service';

@Component({
  selector: 'app-licitacoes-detalhar-info',
  templateUrl: './licitacoes-detalhar-info.component.html',
  styleUrls: ['./licitacoes-detalhar-info.component.scss']
})
export class LicitacoesDetalharInfoComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject();

  public licitacao: Licitacao;
  public valorContratado: number;
  public timeline: any[];

  constructor(
    private activatedroute: ActivatedRoute,
    private licitacaoService: LicitacaoService,
    public novidadeService: NovidadeService) { }

  ngOnInit() {
    this.activatedroute.parent.params.pipe(take(1)).subscribe(params => {
      this.getLicitacaoByID(params.id);
    });
  }

  getLicitacaoByID(id: string) {
    this.licitacaoService.get(id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(licitacao => {
        this.licitacao = licitacao;

        this.valorContratado = licitacao.contratosLicitacao.reduce((sum, contrato) => {
          return sum + contrato.vl_contrato;
        }, 0);

        const timeline = nest()
          .key((d: any) => d.data)
          .key((d: any) => d.id_tipo)
          .rollup((novidades: any[]) => {
            const valorTotal = novidades.reduce((acumulador, novidade) => {
              if (this.novidadeService.isEmpenho(novidade.id_tipo)) {
                const valor = +novidade.texto_novidade;
                return acumulador + valor;
              } else {
                return 0;
              }
            }, 0);
            return {
              total: valorTotal,
              texto: novidades[0].tipo.texto_evento
            } as any;
          })
          .entries(this.licitacao.licitacaoNovidade);

        this.timeline = timeline;
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
