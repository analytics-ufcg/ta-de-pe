import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

import { UserService } from '../shared/services/user.service';
import { LicitacaoService } from '../shared/services/licitacao.service';
import { Licitacao } from '../shared/models/licitacao.model';
import { ContratoService } from '../shared/services/contrato.service';
import { ContratoLicitacao } from '../shared/models/contratoLicitacao.model';

@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.scss']
})
export class MunicipioComponent implements OnInit {

  private unsubscribe = new Subject();

  public municipioEscolhido: string;
  public licitacoesAbertas: Licitacao[];
  public contratosVigentes: ContratoLicitacao[];

  constructor(
    private userService: UserService,
    private licitacaoService: LicitacaoService,
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
        this.getLicitacoesAbertas(this.municipioEscolhido);
        this.getContratosVigentes(this.municipioEscolhido);
      });
  }

  getLicitacoesAbertas(municipio: string) {
    this.licitacaoService.getAbertas(municipio)
      .pipe(takeUntil(this.unsubscribe)).subscribe(licitacoes => {
        this.licitacoesAbertas = licitacoes;
      });
  }

  getContratosVigentes(municipio: string) {
    this.contratoService.getVigentes(municipio)
      .pipe(takeUntil(this.unsubscribe)).subscribe(contratos => {
        this.contratosVigentes = contratos;
      });
  }

}
