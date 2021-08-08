import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Subject, BehaviorSubject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { EventoOrd } from 'src/app/shared/models/lista.model';
import { OrdenavelDirective } from 'src/app/shared/directives/ordenavel.directive';
import { LicitacaoService } from '../../shared/services/licitacao.service';
import { ListaLicitacoesService } from 'src/app/shared/services/lista.service';
import { MunicipioService } from 'src/app/shared/services/municipio.service';

@Component({
  selector: 'app-licitacoes',
  templateUrl: './licitacoes.component.html',
  styleUrls: ['./licitacoes.component.scss'],
  providers: [ListaLicitacoesService, DecimalPipe]
})
export class LicitacoesComponent implements OnInit {

  private unsubscribe = new Subject();

  public loading$ = new BehaviorSubject<boolean>(true);
  public municipioEscolhido: string;
  public p = 1;

  @ViewChildren(OrdenavelDirective) cabecalhos: QueryList<OrdenavelDirective>;

  constructor(
    private licitacaoService: LicitacaoService,
    public listaService: ListaLicitacoesService,
    private municipioService: MunicipioService,
    private activatedRoute: ActivatedRoute
  ) {
    this.listaService.colunaOrd = 'data_abertura';
    this.listaService.direcaoOrd = 'desc';
  }

  ngOnInit() {
    this.activatedRoute.parent.paramMap
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(params => {
        const slug = params.get('slug');
        if (slug !== undefined && slug !== null) {
          this.municipioService.getBySlug(slug).subscribe(municipio => {
            this.listaService.dados$ = this.licitacaoService
              .getLicitacoes(municipio.cd_municipio_ibge)
              .pipe(
                map(licitacoes => {
                  licitacoes.map(licitacao => {
                    licitacao.qt_contratos = licitacao.contratosLicitacao.length;
                    licitacao.status = licitacao.qt_contratos === 0 ? 'Sem compras' : 'Com compras';
                    licitacao.vl_contratado = licitacao.contratosLicitacao
                      .reduce((sum, contrato) => sum + contrato.vl_contrato, 0);
                  });
                  return licitacoes.slice().sort((l1, l2) => l2.status.localeCompare(l1.status));
                }),
                tap(() => this.loading$.next(false))
              );
            this.listaService.busca$.next();
          });
        }
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

  pageChange(p: number) {
    this.p = p;
  }

}
