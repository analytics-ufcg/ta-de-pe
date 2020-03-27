import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

import { Licitacao } from 'src/app/shared/models/licitacao.model';
import { LicitacaoService } from 'src/app/shared/services/licitacao.service';
import { ItensLicitacao } from 'src/app/shared/models/itensLicitacao.model';

@Component({
  selector: 'app-licitacoes-detalhar-itens',
  templateUrl: './licitacoes-detalhar-itens.component.html',
  styleUrls: ['./licitacoes-detalhar-itens.component.scss']
})
export class LicitacoesDetalharItensComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject();

  public licitacao: Licitacao;
  public descricao: string;
  public page = 1;
  public pageSize = 20;

  constructor(
    private activatedroute: ActivatedRoute,
    private modalService: NgbModal,
    private licitacaoService: LicitacaoService) { }

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
      });
  }

  get itensPaginate(): ItensLicitacao[] {
    if (this.licitacao && this.licitacao.itensLicitacao) {
      return this.licitacao.itensLicitacao
        .map((item, i) => ({ id: i + 1, ...item }))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
  }

  getIndice(index: number) {
    return (this.pageSize * (this.page - 1)) + index + 1;
  }

  getDescricaoResumida(descricao: string): string {
    return descricao.split(/\s+|:/)[0];
  }

  open(content, descricao: string): void {
    this.descricao = descricao;
    this.modalService.open(content, { ariaLabelledBy: 'modal-descricao'});
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
