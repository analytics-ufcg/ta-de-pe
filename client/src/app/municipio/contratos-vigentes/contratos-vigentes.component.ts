import { Component, OnInit } from '@angular/core';

import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { takeUntil, debounceTime, map } from 'rxjs/operators';

import { ResumirTextoPipe } from './../../shared/pipes/resumir-texto.pipe';

import { UserService } from '../../shared/services/user.service';
import { ContratoService } from '../../shared/services/contrato.service';
import { ContratoLicitacao } from '../../shared/models/contratoLicitacao.model';

@Component({
  selector: 'app-contratos-vigentes',
  templateUrl: './contratos-vigentes.component.html',
  styleUrls: ['./contratos-vigentes.component.scss'],
  providers: [
    ResumirTextoPipe
  ]
})
export class ContratosVigentesComponent implements OnInit {

  private unsubscribe = new Subject();

  public contratosVigentes$: Observable<ContratoLicitacao[]>;
  public loading$ = new BehaviorSubject<boolean>(true);
  public municipioEscolhido: string;

  constructor(
    private userService: UserService,
    private contratoService: ContratoService,
    private resumirPipe: ResumirTextoPipe
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
        this.contratosVigentes$ = this.contratoService.getVigentes(municipio)
        .pipe(
          map((contratos) => {
              contratos.map(
                contrato => {
                  contrato.descricao_objeto_resumida = this.resumirPipe.transform( contrato.descricao_objeto_contrato);
                }
              );
              return contratos;
            }
          )
        );
        this.loading$.next(false);
      });
  }
}
