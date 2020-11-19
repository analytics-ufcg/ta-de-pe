import { AfterContentInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { indicate } from '../shared/functions/indicate.function';
import { AlertaService } from '../shared/services/alerta.service';

import { Alerta } from '../shared/models/alerta.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

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

    const queryParams: Params = Object.assign({}, this.activatedRoute.snapshot.queryParams);
    queryParams.page = p;
    this.router.navigate([], { queryParams });
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

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
