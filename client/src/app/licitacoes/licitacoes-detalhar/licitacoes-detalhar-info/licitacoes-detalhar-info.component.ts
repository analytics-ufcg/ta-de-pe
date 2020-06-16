import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject, forkJoin } from 'rxjs';
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
  public quantContratos: number;
  public timeline: any[];
  public isLoading = true;

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
    forkJoin(
      this.licitacaoService.get(id),
      this.licitacaoService.getNovidades(id)
    ).pipe(takeUntil(this.unsubscribe)).subscribe(data => {
      this.licitacao = data[0];
      const novidadesLicitacao = data[1];

      this.valorContratado = data[0].contratosLicitacao.reduce((sum, contrato) => {
        return sum + contrato.vl_contrato;
      }, 0);

      this.quantContratos = data[0].contratosLicitacao.length;

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
            novidade: novidades[0]
          } as any;
        })
        .entries(novidadesLicitacao);

      timeline.sort((a, b) => {
        const i = new Date(a.key).getTime();
        const j = new Date(b.key).getTime();

        return j > i ? 1 : -1;
      });

      this.timeline = timeline;
      this.isLoading = false;
    });
  }

  isOrgaoPrefeitura(nomeOrgao: string): boolean {
    if (typeof nomeOrgao === 'undefined' || !nomeOrgao) {
      return false;
    }
    return (nomeOrgao.substr(0, 5) === 'PM DE');
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
