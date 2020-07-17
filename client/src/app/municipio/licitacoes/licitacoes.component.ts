import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

import { UserService } from '../../shared/services/user.service';
import { LicitacaoService } from '../../shared/services/licitacao.service';
import { Licitacao } from '../../shared/models/licitacao.model';

@Component({
  selector: 'app-licitacoes',
  templateUrl: './licitacoes.component.html',
  styleUrls: ['./licitacoes.component.scss']
})
export class LicitacoesComponent implements OnInit {

  private unsubscribe = new Subject();

  public municipioEscolhido: string;
  public licitacoes: Licitacao[];
  public isLoading = true;

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
        this.getLicitacoes(this.municipioEscolhido);
      });
  }

  getLicitacoes(municipio: string) {
    this.licitacaoService.getLicitacoes(municipio)
      .pipe(takeUntil(this.unsubscribe)).subscribe(licitacoes => {
        this.licitacoes = licitacoes;
        // Adiciona status
        this.licitacoes
          .map(licitacao => licitacao.status = licitacao.data_homologacao === null ? 'Aberta' : 'Encerrada');
        // Ordena por status
        this.licitacoes
          .sort((l1, l2) => l1.status.localeCompare(l2.status));
        this.isLoading = false;
      });
  }

}
