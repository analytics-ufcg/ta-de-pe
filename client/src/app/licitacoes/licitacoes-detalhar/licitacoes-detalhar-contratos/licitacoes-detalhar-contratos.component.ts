import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

import { ContratoLicitacao } from 'src/app/shared/models/contratoLicitacao.model';
import { LicitacaoService } from 'src/app/shared/services/licitacao.service';
import { ItensContrato } from 'src/app/shared/models/itensContrato.model';

@Component({
  selector: 'app-licitacoes-detalhar-contratos',
  templateUrl: './licitacoes-detalhar-contratos.component.html',
  styleUrls: ['./licitacoes-detalhar-contratos.component.scss']
})
export class LicitacoesDetalharContratosComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject();

  public contratoLicitacao: ContratoLicitacao[];
  public itemSelecionado: ItensContrato;
  public activeIds: string[] = [];
  public isLoading = true;

  constructor(
    private activatedroute: ActivatedRoute,
    private modalService: NgbModal,
    private licitacaoService: LicitacaoService) { }

  ngOnInit() {
    this.activatedroute.parent.params.pipe(take(1)).subscribe(params => {
      this.getContratosLicitacaoByID(params.id);
    });
    this.activatedroute.queryParams.pipe(take(1)).subscribe(params => {
      this.activeIds = ['panel-' + params.id];
    });
  }

  getContratosLicitacaoByID(id: string) {
    this.licitacaoService.getContratos(id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(contratosLicitacao => {
        this.contratoLicitacao = contratosLicitacao;
        this.contratoLicitacao.map(contrato => {
          contrato.valor_contratado = contrato.itensContrato.reduce((sum, item) => {
            return sum + (item.vl_item_contrato * item.qt_itens_contrato);
          }, 0);
          contrato.valor_estimado = contrato.itensContrato.reduce((sum, item) => {
            return sum + (item.itensLicitacaoItensContrato.vl_unitario_estimado * item.qt_itens_contrato);
          }, 0);
          contrato.itensContrato.map(item => {
            item.media_valor = item.itensSemelhantes.filter(d => {
              return d.ano_licitacao === item.ano_licitacao;
            }).reduce((sum, itemB) => {
              return sum + itemB.vl_item_contrato / item.itensSemelhantes.filter(d => {
                return d.ano_licitacao === item.ano_licitacao;
              }).length;
            }, 0);
          });
        });
        this.isLoading = false;
      });
  }

  getDescricaoResumida(descricao: string): string {
    const split = descricao.split(/\s+|:|,/);
    let str = '';
    let i = 0;
    do {
      str += split[i] + ' ';
      i++;
    } while (str.length < 20 && typeof split[i] !== 'undefined');
    return str.substr(0, str.length - 1);
  }

  getTipoFornecedor(tipoFornecedor: string): string {
    if (tipoFornecedor === 'J') {
      return 'Pessoa Jurídica';
    } else if (tipoFornecedor === 'F') {
      return 'Pessoa Física';
    } else if (tipoFornecedor === 'C') {
      return 'Consórcio';
    }
    return 'Outros';
  }

  open(content, item: ItensContrato): void {
    this.itemSelecionado = item;
    this.modalService.open(content, { ariaLabelledBy: 'modal-descricao', size: 'xl' });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
