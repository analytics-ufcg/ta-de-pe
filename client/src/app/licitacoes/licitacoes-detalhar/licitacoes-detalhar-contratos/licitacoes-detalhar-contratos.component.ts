import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbModal, NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil, take, map } from 'rxjs/operators';

import { ContratoLicitacao } from 'src/app/shared/models/contratoLicitacao.model';
import { LicitacaoService } from 'src/app/shared/services/licitacao.service';
import { ItensService } from 'src/app/shared/services/itens.service';

@Component({
  selector: 'app-licitacoes-detalhar-contratos',
  templateUrl: './licitacoes-detalhar-contratos.component.html',
  styleUrls: ['./licitacoes-detalhar-contratos.component.scss']
})
export class LicitacoesDetalharContratosComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject();

  public contratoLicitacao: ContratoLicitacao[];
  public descricao: string;
  public activeIds: string[] = [];

  constructor(
    private activatedroute: ActivatedRoute,
    private modalService: NgbModal,
    private licitacaoService: LicitacaoService,
    private itensService: ItensService) { }

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
            let tituloItem = item.ds_item.split(/\s+|:|-/).slice(0, 3).map(palavra => {
              return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
            }).filter(i => i !== '').join(' & ');
            this.getMediaItensSemelhantes(tituloItem, item.ano_licitacao).then(media => {
              item.media_valor = media;
            });
          });
        });
      });
  }

  getMediaItensSemelhantes(dsItem: string, ano: number) {
    return this.itensService.getItensSimilares(dsItem, ano);
  }

  getDescricaoResumida(descricao: string): string {
    return descricao.split(/\s+|:/)[0];
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

  open(content, descricao: string): void {
    this.descricao = descricao;
    this.modalService.open(content, { ariaLabelledBy: 'modal-descricao' });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
