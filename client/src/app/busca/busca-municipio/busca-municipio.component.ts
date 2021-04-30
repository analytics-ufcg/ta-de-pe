import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DecimalPipe } from '@angular/common';

import { BehaviorSubject } from 'rxjs';

import { ListaMunicipiosService } from 'src/app/shared/services/lista.service';
import { MunicipioService } from 'src/app/shared/services/municipio.service';
import { UserService } from 'src/app/shared/services/user.service';
import { EventoOrd } from 'src/app/shared/models/lista.model';
import { OrdenavelDirective } from 'src/app/shared/directives/ordenavel.directive';


@Component({
  selector: 'app-busca-municipio',
  templateUrl: './busca-municipio.component.html',
  styleUrls: ['./busca-municipio.component.scss'],
  providers: [
    ListaMunicipiosService,
    DecimalPipe
  ]
})
export class BuscaMunicipioComponent implements OnInit {

  public loading$ = new BehaviorSubject<boolean>(true);
  public termo = '';

  @ViewChildren(OrdenavelDirective) cabecalhos: QueryList<OrdenavelDirective>;

  constructor(
    private activatedroute: ActivatedRoute,
    private municipioService: MunicipioService,
    private userService: UserService,
    public listaService: ListaMunicipiosService,
  ) {
    this.listaService.colunaOrd = 'nome_municipio';
    this.listaService.direcaoOrd = 'desc';
  }

  ngOnInit() {
    this.activatedroute.queryParamMap.subscribe(params => {
      this.termo = params.get('termo');
      this.listaService.dados$ = this.municipioService
        .buscar(this.termo);

      this.listaService.colunaOrd = 'nome_municipio';
      this.listaService.direcaoOrd = 'desc';
      this.loading$.next(false);
    });
  }

  onOrdenar({ coluna, direcao }: EventoOrd) {
    // Reseta outros cabeçalhos
    this.cabecalhos.forEach(cab => {
      if (cab.ordenavel !== coluna) {
        cab.direcao = '';
        cab.ordAsc = false;
        cab.ordDesc = false;
      }
    });

    this.listaService.colunaOrd = coluna;
    this.listaService.direcaoOrd = direcao;
  }

  onClick(municipio) {
    this.userService.setMunicipioEscolhido(municipio.nome_municipio);
    this.userService.setSiglaEstadoEscolhido(municipio.sigla_estado);
  }

}
