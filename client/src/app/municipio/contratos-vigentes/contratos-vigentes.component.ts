import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
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

  public municipioEscolhido: string;
  public contratosVigentes: ContratoLicitacao[];

  constructor(
    private userService: UserService,
    private contratoService: ContratoService) { }

  ngOnInit() {
    this.getMunicipio();
  }

  getMunicipio() {
    this.userService
      .getMunicipioEscolhido()
      .pipe(
        debounceTime(300),
        takeUntil(this.unsubscribe))
      .subscribe(municipio => {
        this.municipioEscolhido = municipio;
        this.getContratosVigentes(this.municipioEscolhido);
      });
  }

  getContratosVigentes(municipio: string) {
    this.contratoService.getVigentes(municipio)
      .pipe(takeUntil(this.unsubscribe)).subscribe(contratos => {
        this.contratosVigentes = contratos;
      });
  }

}
