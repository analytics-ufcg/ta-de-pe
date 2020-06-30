import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import * as d3 from 'd3-scale';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil, take, map } from 'rxjs/operators';

import { ContratoLicitacao } from 'src/app/shared/models/contratoLicitacao.model';
import { ItensContrato } from 'src/app/shared/models/itensContrato.model';
import { ContratoService } from 'src/app/shared/services/contrato.service';
import { ItensService } from 'src/app/shared/services/itens.service';
import { ResumirTextoPipe } from 'src/app/shared/pipes/resumir-texto.pipe';


@Component({
  selector: 'app-info-contrato',
  templateUrl: './info-contrato.component.html',
  styleUrls: ['./info-contrato.component.scss'],
  providers: [ResumirTextoPipe]
})
export class InfoContratoComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject();

  public contrato: ContratoLicitacao;
  public itemSelecionado: ItensContrato;
  public isLoading = true;
  public radioGroupForm: FormGroup;

  constructor(
    private activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private contratoService: ContratoService,
    private itensService: ItensService,
    private resumirPipe: ResumirTextoPipe
  ) { }

  ngOnInit() {
    this.activatedroute.params.pipe(take(1)).subscribe(params => {
      this.getContratoByID(params.id);
    });
    this.radioGroupForm = this.formBuilder.group({
      showTotal: false
    });
  }

  getContratoByID(id: string) {
    this.contratoService.get(id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(contrato => {
        this.contrato = contrato;
        this.contrato.valor_contratado = contrato.itensContrato.reduce((sum, item) => {
          return sum + (item.vl_item_contrato * item.qt_itens_contrato);
        }, 0);
        this.contrato.valor_estimado = contrato.itensContrato.reduce((sum, item) => {
          return sum + (item.itensLicitacaoItensContrato.vl_unitario_estimado * item.qt_itens_contrato);
        }, 0);
        contrato.itensContrato.map(item => {
          item.ds_item_resumido = this.resumirPipe.transform(item.ds_item);
          const tituloItem = item.ds_item.split(/\s+|:|-/).slice(0, 3).map(palavra => {
            return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
          }).filter(i => i !== '');
          this.getMediaItensSemelhantes(tituloItem, item.dt_inicio_vigencia)
            .then(res => {
              item.mediana_valor = res.mediana;
              item.itensSemelhantes = res.itensOrdenados;
              item.percentual_vs_estado = (item.vl_item_contrato - res.mediana) / res.mediana;
              item.percentual_vs_estimado = (item.vl_item_contrato - item.itensLicitacaoItensContrato.vl_unitario_estimado)
                                            / item.itensLicitacaoItensContrato.vl_unitario_estimado;
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

  defineCorFundo(valor: number): string {
    const cor: any = d3.scaleLinear()
    .domain([-1, 0, 1])
    .range(['#72a5b6', '#ffffff', '#d7856c']);
    return cor(valor);
  }

  defineCor(valor: number): string {
    return (valor >= 0.7 || valor <= -0.7) ? 'white' : 'black';
  }

  open(content, item: ItensContrato): void {
    this.itemSelecionado = item;
    this.itemSelecionado.itensSemelhantes.map(itemSemelhante => {
      itemSemelhante.percentual_vs_semelhante = (item.vl_item_contrato - itemSemelhante.vl_item_contrato) / itemSemelhante.vl_item_contrato;
    });
    this.modalService.open(content, { ariaLabelledBy: 'modal-descricao', size: 'xl' });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
