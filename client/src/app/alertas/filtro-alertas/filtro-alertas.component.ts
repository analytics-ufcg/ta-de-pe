import { take } from 'rxjs/operators';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AlertaService } from '../../shared/services/alerta.service';

@Component({
  selector: 'app-filtro-alertas',
  templateUrl: './filtro-alertas.component.html',
  styleUrls: ['./filtro-alertas.component.scss']
})
export class FiltroAlertasComponent implements OnInit {

  @Output() filterChange = new EventEmitter<any>();

  private unsubscribe = new Subject();

  nomePesquisado: string;
  estadoSelecionado: string;

  estadoFiltro: any[] = [{ estado: 'Estados', estado_slug: '0' }];

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertaService: AlertaService) { }

  ngOnInit() {
    this.estadoSelecionado = '0';
    this.updateFiltroViaURL();
    this.getListaEstados();
  }

  getListaEstados() {
    this.alertaService
      .getListaEstados()
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe(estados => {
        const parsedEstados = estados.map(estado => {
          const parsedEstado = {
            estado: estado.sigla_estado,
            estado_slug: String(estado.id_estado),
          };
          return parsedEstado;
        })
        this.estadoFiltro = [...this.estadoFiltro, ...parsedEstados];
      });
  }

  aplicarFiltro() {
    const filtro = {
      nomePesquisado: this.nomePesquisado,
      estado: this.estadoSelecionado
    };
    this.filterChange.emit(filtro);
  }

  updateFiltroViaURL() {
    this.activatedRoute.queryParams
      .pipe(take(1))
      .subscribe(params => {
        const search = params.search;
        const estado = params.estado;

        if (search && search !== null) {
          this.nomePesquisado = search;
        }

        if (estado && estado !== null) {
          this.estadoSelecionado = estado;
        }

        this.aplicarFiltro();
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
