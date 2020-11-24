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
    if (filtro.nomePesquisado !== undefined && filtro.nomePesquisado !== '') {
      this.pageChange(1);
      this.router.navigate([], { queryParams: { page: 1, search: filtro.nomePesquisado }, queryParamsHandling: 'merge' });
    } else {
      this.router.navigate([], { queryParams: { search: '' }, queryParamsHandling: 'merge' });
    }

    this.alertaService.search(filtro);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
