import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

import { UserService } from '../../shared/services/user.service';
import { LicitacaoService } from '../../shared/services/licitacao.service';
import { Licitacao } from '../../shared/models/licitacao.model';

@Component({
  selector: 'app-licitacoes-abertas',
  templateUrl: './licitacoes-abertas.component.html',
  styleUrls: ['./licitacoes-abertas.component.scss']
})
export class LicitacoesAbertasComponent implements OnInit {

  private unsubscribe = new Subject();

  public municipioEscolhido: string;
  public licitacoesAbertas: Licitacao[];

  constructor(
    private userService: UserService,
    private licitacaoService: LicitacaoService) { }

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
      });
  }

  getLicitacoesAbertas(municipio: string) {
    this.licitacaoService.getAbertas(municipio)
      .pipe(takeUntil(this.unsubscribe)).subscribe(licitacoes => {
        this.licitacoesAbertas = licitacoes;
      });
  }

}
