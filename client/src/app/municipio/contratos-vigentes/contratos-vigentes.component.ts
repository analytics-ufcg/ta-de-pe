import { Component, OnInit } from '@angular/core';

import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

import { UserService } from '../../shared/services/user.service';
import { ContratoService } from '../../shared/services/contrato.service';
import { ContratoLicitacao } from '../../shared/models/contratoLicitacao.model';

@Component({
  selector: 'app-contratos-vigentes',
  templateUrl: './contratos-vigentes.component.html',
  styleUrls: ['./contratos-vigentes.component.scss']
})
export class ContratosVigentesComponent implements OnInit {

  private unsubscribe = new Subject();

  public contratosVigentes$: Observable<ContratoLicitacao[]>;
  public loading$ = new BehaviorSubject<boolean>(true);
  public municipioEscolhido: string;

  constructor(
    private userService: UserService,
    private contratoService: ContratoService
    ) {}

  ngOnInit() {
    this.userService
      .getMunicipioEscolhido()
      .pipe(
        debounceTime(300),
        takeUntil(this.unsubscribe)
      )
      .subscribe(municipio => {
        this.municipioEscolhido = municipio;
        this.contratosVigentes$ = this.contratoService.getVigentes(municipio);
        this.loading$.next(false);
      });
  }
}
