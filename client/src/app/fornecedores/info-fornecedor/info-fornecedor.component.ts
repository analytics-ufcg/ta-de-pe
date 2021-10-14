import { DecimalPipe } from '@angular/common';
import { EventoOrd } from './../../shared/models/lista.model';
import { OrdenavelDirective } from 'src/app/shared/directives/ordenavel.directive';
import { take, takeUntil, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Component, OnInit, ViewChildren, QueryList, SimpleChanges } from '@angular/core';

import { Fornecedor } from './../../shared/models/fornecedor.model';
import { ListaContratosFornecedorService } from './../../shared/services/lista.service';
import { FornecedorService } from './../../shared/services/fornecedor.service';

@Component({
  selector: 'app-info-fornecedor',
  templateUrl: './info-fornecedor.component.html',
  styleUrls: ['./info-fornecedor.component.scss'],
  providers: [ListaContratosFornecedorService, DecimalPipe]
})
export class InfoFornecedorComponent implements OnInit {

  private unsubscribe = new Subject();
  @ViewChildren(OrdenavelDirective) cabecalhos: QueryList<OrdenavelDirective>;

  public fornecedor: Fornecedor;
  public showFimVigencia = true;
  public isLoading = true;
  public showSocios = 5;
  public showAtividades = 5;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fornecedorService: FornecedorService,
    public listaService: ListaContratosFornecedorService
  ) {
   }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(take(1)).subscribe(params => {
      this.getFornecedorByID(params.id);
      this.getContratosFornecedorByID(params.id);
    });
  }

  getFornecedorByID(id: string) {
    this.fornecedorService
      .get(id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(fornecedor => {
        this.fornecedor = fornecedor;
      });
  }

  getContratosFornecedorByID(id: string) {
    this.listaService.dados$ = this.fornecedorService
      .getContratos(id)
      .pipe(map(contratos => {
        // itens ordenados pela data do inicio da vigencia
        contratos.sort((c1, c2) => new Date(c1.dt_inicio_vigencia).getTime() - new Date(c2.dt_inicio_vigencia).getTime());
        this.isLoading = false;
        return contratos;
      }));
  }

  onOrdenar({coluna, direcao}: EventoOrd) {
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

  mostraMaisSocios() {
    if (this.showSocios < this.fornecedor.fornecedorDadosCadastrais.dadosCadastraisSocios.length) {
      this.showSocios = this.fornecedor.fornecedorDadosCadastrais.dadosCadastraisSocios.length;
    } else {
      this.showSocios = 5;
    }
  }

  mostraMaisAtividadesEconomicas() {
    if (this.showAtividades < this.fornecedor.fornecedorCnaesSecundarios.length) {
      this.showAtividades = this.fornecedor.fornecedorCnaesSecundarios.length;
    } else {
      this.showAtividades = 5;
    }
  }

  onClickAlerta(idFornecedor) {
    if (idFornecedor) {
      this.router.navigate(['/malhaFina'], { queryParams: {search: idFornecedor, page: 1}});
    }
  }

}
