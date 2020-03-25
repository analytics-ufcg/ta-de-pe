import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Licitacao } from 'src/app/shared/models/licitacao.model';
import { ItensLicitacao } from 'src/app/shared/models/itensLicitacao.model';
import { LicitacaoService } from 'src/app/shared/services/licitacao.service';

@Component({
  selector: 'app-licitacoes-detalhar',
  templateUrl: './licitacoes-detalhar.component.html',
  styleUrls: ['./licitacoes-detalhar.component.scss']
})
export class LicitacoesDetalharComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject();

  public licitacao: Licitacao;

  page = 1;
  pageSize = 8;

  constructor(
    private activatedroute: ActivatedRoute,
    private licitacaoService: LicitacaoService) { }

  ngOnInit() {
    const id = this.activatedroute.snapshot.paramMap.get('id');
    this.getLicitacaoByID(id);
  }

  getLicitacaoByID(id: string) {
    this.licitacaoService.get(id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(licitacao => {
        this.licitacao = licitacao;
      });
  }

  get itensPaginate(): ItensLicitacao[] {
    if (this.licitacao && this.licitacao.itensLicitacao) {
      return this.licitacao.itensLicitacao
      .map((item, i) => ({id: i + 1, ...item}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }

  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
