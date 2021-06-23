import { AfterContentInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';

import { indicate } from '../shared/functions/indicate.function';
import { AlertaService } from '../shared/services/alerta.service';

import { Alerta } from '../shared/models/alerta.model';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.scss']
})
export class AlertasComponent implements OnInit, OnDestroy, AfterContentInit {

  private unsubscribe = new Subject();

  public alertas: Alerta[];
  public loading$ = new BehaviorSubject<boolean>(true);
  public filtros: any = {
    nomePesquisado: '',
    tiposAlertas: undefined
  };

  public p = 1;

  constructor(
    private alertaService: AlertaService,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private router: Router) { }

  ngOnInit() {
    this.getAlertas();
    this.updatePageViaURL();
  }

  ngAfterContentInit() {
    this.cdRef.detectChanges();
  }

  getAlertas() {
    this.alertaService
      .getAlertas()
      .pipe(
        skip(1),
        indicate(this.loading$),
        takeUntil(this.unsubscribe)
      )
      .subscribe(alertas => {
        this.alertas = alertas;
        this.loading$.next(false);
      });

    // condições utilizadas para atualizar o menu quando não houver filtros na busca
    // deve ser removido quando as opções do menu forem adicionadas na URL.
    if (Object.keys(this.filtros).indexOf('nomePesquisado') !== -1) {
      if (this.filtros.nomePesquisado === undefined || this.filtros.nomePesquisado === '') {
        this.search(this.filtros);
      }
    }
  }

  pageChange(p: number) {
    this.p = p;

    this.router.navigate([], { queryParams: { page: p }, queryParamsHandling: 'merge' });
  }

  updatePageViaURL() {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(params => {
        const page = params.page;

        if (page !== undefined && page !== null) {
          this.p = Number(page);
        } else {
          this.p = 1;
        }
      });
  }

  search(filtro) {
    if (Object.keys(filtro).indexOf('nomePesquisado') !== -1) {
      if (filtro.nomePesquisado !== undefined && filtro.nomePesquisado !== '') {
        this.pageChange(1);
        this.router.navigate([], { queryParams: { page: 1, search: filtro.nomePesquisado }, queryParamsHandling: 'merge' });
      } else {
        this.router.navigate([], { queryParams: { search: '' }, queryParamsHandling: 'merge' });
      }
    }
    this.filtros = {
      nomePesquisado: filtro.nomePesquisado,
      tiposAlertas: this.filtros.tiposAlertas,
      estado: filtro.estado
    };
    this.alertaService.search(this.filtros);
  }

  filterAlertas(filtroPorTipo) {
    this.filtros = {
      nomePesquisado: this.filtros.nomePesquisado,
      tiposAlertas: filtroPorTipo.alertasSelecionados,
      estado: this.filtros.estado
    };
    this.alertaService.search(this.filtros);
  }


  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
