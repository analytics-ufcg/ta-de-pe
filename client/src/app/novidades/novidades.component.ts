import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Novidade } from '../shared/models/novidade.model';
import { NovidadeService } from '../shared/services/novidade.service';


@Component({
  selector: 'app-novidades',
  templateUrl: './novidades.component.html',
  styleUrls: ['./novidades.component.scss']
})
export class NovidadesComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject();

  public novidades: Novidade[];

  constructor(private novidadesServices: NovidadeService) { }

  ngOnInit() {
    this.getNovidades();
  }

  getNovidades() {
    this.novidadesServices.getNovidades()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(novidades => this.novidades = novidades);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
