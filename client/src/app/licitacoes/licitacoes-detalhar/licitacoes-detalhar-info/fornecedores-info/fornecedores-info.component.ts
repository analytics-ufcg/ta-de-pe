import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

import { LicitacaoService } from 'src/app/shared/services/licitacao.service';
import { Fornecedor } from 'src/app/shared/models/fornecedor.model';

@Component({
  selector: 'app-fornecedores-info',
  templateUrl: './fornecedores-info.component.html',
  styleUrls: ['./fornecedores-info.component.scss']
})
export class FornecedoresInfoComponent implements OnInit, OnChanges, OnDestroy {

  private unsubscribe = new Subject();

  @Input() idLicitacao: string;

  fornecedores: Fornecedor[];
  page = 1;
  pageSize = 20;

  constructor(private licitacaoService: LicitacaoService) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (
      typeof changes.idLicitacao !== 'undefined' &&
      typeof changes.idLicitacao.currentValue !== 'undefined' &&
      changes.idLicitacao.currentValue !== null
    ) {
      this.getFornecedoresLicitacaoByID(this.idLicitacao);
    }
  }

  getFornecedoresLicitacaoByID(id: string) {
    this.licitacaoService.getFornecedores(id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(fornecedores => {
        this.fornecedores = fornecedores.sort((a, b) => {
          return b.total_contratado - a.total_contratado;
        });
      });
  }

  get itensPaginate(): Fornecedor[] {
    if (this.fornecedores) {
      return this.fornecedores
        .map((item, i) => ({ id: i + 1, ...item }))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
  }

  getIndice(index: number) {
    return (this.pageSize * (this.page - 1)) + index + 1;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
