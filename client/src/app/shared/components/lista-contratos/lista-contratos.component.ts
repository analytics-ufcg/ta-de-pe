import { Component, OnInit, Input, PipeTransform, OnChanges, SimpleChanges, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ContratoLicitacao } from '../../models/contratoLicitacao.model';
import { EventoOrd } from '../../models/lista.model';
import { ListaService } from '../../services/lista.service';
import { OrdenavelDirective } from '../../directives/ordenavel.directive';

@Component({
  selector: 'app-lista-contratos',
  templateUrl: './lista-contratos.component.html',
  styleUrls: ['./lista-contratos.component.scss'],
  providers: [ListaService, DecimalPipe]
})
export class ListaContratosComponent implements OnChanges {
  @Input() contratos$: Observable<ContratoLicitacao[]>;

  @ViewChildren(OrdenavelDirective) cabecalhos: QueryList<OrdenavelDirective>;

  constructor(
    public listaService: ListaService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.listaService.dados$ = this.contratos$;
  }
}
