import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Licitacao } from 'src/app/shared/models/licitacao.model';
import { LicitacaoService } from 'src/app/shared/services/licitacao.service';

@Component({
  selector: 'app-licitacoes-detalhar',
  templateUrl: './licitacoes-detalhar.component.html',
  styleUrls: ['./licitacoes-detalhar.component.scss']
})
export class LicitacoesDetalharComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject();

  public licitacao: Licitacao;
  public temContrato = false;

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
        this.temContrato = this.licitacao.contratosLicitacao.reduce((accumulator, currentValue) => {
          if (accumulator) {
            return true;
          }
          return (currentValue.tipo_instrumento_contrato !== 'Compra');
        }, false);
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
