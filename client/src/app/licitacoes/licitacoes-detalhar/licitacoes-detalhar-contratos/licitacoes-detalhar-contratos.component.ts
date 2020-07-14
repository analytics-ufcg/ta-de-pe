import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { ContratoLicitacao } from 'src/app/shared/models/contratoLicitacao.model';
import { LicitacaoService } from 'src/app/shared/services/licitacao.service';
import { ItensContrato } from 'src/app/shared/models/itensContrato.model';
import { ItensService } from 'src/app/shared/services/itens.service';

import * as d3 from 'd3-scale';

@Component({
  selector: 'app-licitacoes-detalhar-contratos',
  templateUrl: './licitacoes-detalhar-contratos.component.html',
  styleUrls: ['./licitacoes-detalhar-contratos.component.scss']
})
export class LicitacoesDetalharContratosComponent implements OnInit {

  public contratosLicitacao$: Observable<ContratoLicitacao[]>;

  public itemSelecionado: ItensContrato;
  public activeIds: string[] = [];
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
    this.contratosLicitacao$ = this.licitacaoService.getContratos(id);
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

  defineCorFundo(valor: number): string {
    const cor: any = d3.scaleLinear()
    .domain([-1, 0, 1])
    .range(['#72a5b6', '#ffffff', '#d7856c']);
    return cor(valor);
  }

  defineCor(valor: number): string {
    return (valor >= 1 || valor <= -1) ? 'white' : 'black';
  }

  open(content, item: ItensContrato): void {
    this.itemSelecionado = item;
    this.modalService.open(content, { ariaLabelledBy: 'modal-descricao', size: 'xl' });
  }
}
