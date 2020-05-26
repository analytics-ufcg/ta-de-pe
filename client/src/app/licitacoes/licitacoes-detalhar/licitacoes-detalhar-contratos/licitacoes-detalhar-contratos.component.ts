import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil, take, map } from 'rxjs/operators';

import { ContratoLicitacao } from 'src/app/shared/models/contratoLicitacao.model';
import { LicitacaoService } from 'src/app/shared/services/licitacao.service';
import { ItensContrato } from 'src/app/shared/models/itensContrato.model';
import { ItensService } from 'src/app/shared/services/itens.service';

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
  public radioGroupForm: FormGroup;
  public showTotal = false;

  constructor(
    private activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder,
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
    this.radioGroupForm = this.formBuilder.group({
      showTotal: false
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
            const tituloItem = item.ds_item.split(/\s+|:|-/).slice(0, 3).map(palavra => {
              return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
            }).filter(i => i !== '');
            this.getMediaItensSemelhantes(tituloItem, item.dt_inicio_vigencia)
              .then(res => {
                item.mediana_valor = res.mediana;
                item.itensSemelhantes = res.itensOrdenados;
              });
          });
        });
        this.isLoading = false;
      });
  }

  getMediaItensSemelhantes(dsItem: string[], dataInicioContrato: Date) {
    const termos = [dsItem[0], dsItem.slice(0, 2).join(' & '), dsItem.join(' & ')];
    return this.itensService.getItensSimilares(termos, dataInicioContrato)
      .pipe(take(1),
        map(itens => {
          const itensOrdenados = itens.slice(0, 21).sort((a, b) => a.vl_item_contrato - b.vl_item_contrato);
          const meioInf = Math.floor((itensOrdenados.length - 1) / 2);
          const meioSup = Math.ceil((itensOrdenados.length - 1) / 2);
          const mediana = (itensOrdenados[meioInf].vl_item_contrato + itensOrdenados[meioSup].vl_item_contrato) / 2;
          return { mediana, itensOrdenados };
        })
      ).toPromise();
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
