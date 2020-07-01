import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { take, takeUntil, map } from 'rxjs/operators';

import * as d3 from 'd3-scale';

import { ItensContrato } from 'src/app/shared/models/itensContrato.model';
import { ItensService } from 'src/app/shared/services/itens.service';
import { TermosImportantesPipe } from 'src/app/shared/pipes/termos-importantes.pipe';
import { ResumirTextoPipe } from 'src/app/shared/pipes/resumir-texto.pipe';

@Component({
  selector: 'app-info-item',
  templateUrl: './info-item.component.html',
  styleUrls: ['./info-item.component.scss'],
  providers: [
    TermosImportantesPipe,
    ResumirTextoPipe
  ]
})
export class InfoItemComponent implements OnInit {

  private unsubscribe = new Subject();

  public item: ItensContrato;

  constructor(
    private activatedroute: ActivatedRoute,
    private itensService: ItensService,
    private termosPipe: TermosImportantesPipe,
    private resumirPipe: ResumirTextoPipe
  ) { }

  ngOnInit() {
    this.activatedroute.params.pipe(take(1)).subscribe(params => {
      this.getItemByID(params.id);
    });
  }
  getItemByID(id: any) {
    this.itensService.get(id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(item => {
        item.ds_item_resumido = this.resumirPipe.transform(item.ds_item);
        const termos = this.termosPipe.transform(item.ds_item);
        this.itensService.getMediaItensSemelhantes(termos, item.dt_inicio_vigencia)
          .then(res => {
            item.mediana_valor = res.mediana;
            item.itensSemelhantes = res.itensOrdenados.filter(itemSemelhante => itemSemelhante.id_item_contrato !== item.id_item_contrato);
            item.itensSemelhantes.map(itemSemelhante => {
              itemSemelhante.ds_item_resumido = this.resumirPipe.transform(itemSemelhante.ds_item);
              if (itemSemelhante.vl_item_contrato > 0) {
                itemSemelhante.percentual_vs_semelhante = (item.vl_item_contrato - itemSemelhante.vl_item_contrato)
                  / itemSemelhante.vl_item_contrato;
              } else {
                itemSemelhante.percentual_vs_semelhante = 0;
              }
            });
            this.item = item;
          });
      });
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
}
