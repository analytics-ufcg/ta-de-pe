import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { UserService } from '../../shared/services/user.service';
import { LicitacaoService } from '../../shared/services/licitacao.service';
import { ListaLicitacoesService } from 'src/app/shared/services/lista.service';
import { DecimalPipe } from '@angular/common';
import { OrdenavelDirective } from 'src/app/shared/directives/ordenavel.directive';
import { EventoOrd } from 'src/app/shared/models/lista.model';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-licitacoes',
  templateUrl: './licitacoes.component.html',
  styleUrls: ['./licitacoes.component.scss'],
  providers: [ListaLicitacoesService, DecimalPipe]
})
export class LicitacoesComponent implements OnInit {

  public loading$ = new BehaviorSubject<boolean>(true);
  public municipioEscolhido: string;

  @ViewChildren(OrdenavelDirective) cabecalhos: QueryList<OrdenavelDirective>;

  constructor(
    private userService: UserService,
    private licitacaoService: LicitacaoService,
    public listaService: ListaLicitacoesService
    ) { }

  ngOnInit() {
    this.userService
      .getMunicipioEscolhido()
      .subscribe(municipio => {
        this.municipioEscolhido = municipio;
        this.listaService.dados$ = this.licitacaoService
          .getLicitacoes(municipio)
          .pipe(
            map(licitacoes => {
              licitacoes.map(licitacao => {
                licitacao.qt_contratos = licitacao.contratosLicitacao.length;
                licitacao.status = licitacao.qt_contratos === 0 ? 'Sem contratos' : 'Com contratos';
                licitacao.vl_contratado = licitacao.contratosLicitacao
                  .reduce((sum, contrato) => sum + contrato.vl_contrato, 0);
              });
              return licitacoes.slice().sort((l1, l2) => l2.status.localeCompare(l1.status));
            }),
            tap(() => this.loading$.next(false))
          );
      });
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
