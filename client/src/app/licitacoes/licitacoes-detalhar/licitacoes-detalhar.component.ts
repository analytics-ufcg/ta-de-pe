import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Licitacao } from 'src/app/shared/models/licitacao.model';
import { itensLicitacao } from 'src/app/shared/models/itensLicitacao.model';
import { LicitacaoService } from 'src/app/shared/services/licitacao.service';

@Component({
  selector: 'app-licitacoes-detalhar',
  templateUrl: './licitacoes-detalhar.component.html',
  styleUrls: ['./licitacoes-detalhar.component.scss']
})
export class LicitacoesDetalharComponent implements OnInit {

  private unsubscribe = new Subject();

  public licitacao: Licitacao;
  public itens: itensLicitacao;

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
        this.itens = licitacao.itensLicitacao;
        this.qtdItens = licitacao.itensLicitacao.length;
      });
  }

}
