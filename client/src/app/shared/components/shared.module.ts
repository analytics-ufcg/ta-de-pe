import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EscolherMunicipioComponent } from './escolher-municipio/escolher-municipio.component';
import { BuscaMunicipioComponent } from './busca-municipio/busca-municipio.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ProgressComponent } from './progress/progress.component';
import { TooltipAjudaComponent } from './tooltip-ajuda/tooltip-ajuda.component';
import { ListaContratosComponent } from './lista-contratos/lista-contratos.component';
import { PipesModule } from '../pipes/pipes.module';
import { BarraTituloComponent } from './barra-titulo/barra-titulo.component';
import { DescricaoItemComponent } from './descricao-item/descricao-item.component';
import { OrdenavelDirective } from '../directives/ordenavel.directive';
import { DescricaoContratoComponent } from './descricao-contrato/descricao-contrato.component';
import { InputBuscaGeralComponent } from './input-busca-geral/input-busca-geral.component';

@NgModule({
  declarations: [
    EscolherMunicipioComponent,
    BuscaMunicipioComponent,
    SpinnerComponent,
    TooltipAjudaComponent,
    ListaContratosComponent,
    ProgressComponent,
    BarraTituloComponent,
    DescricaoItemComponent,
    OrdenavelDirective,
    DescricaoContratoComponent,
    InputBuscaGeralComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    PipesModule,
    NgxPaginationModule
  ],
  exports: [
    EscolherMunicipioComponent,
    BuscaMunicipioComponent,
    SpinnerComponent,
    TooltipAjudaComponent,
    ListaContratosComponent,
    ProgressComponent,
    BarraTituloComponent,
    DescricaoItemComponent,
    OrdenavelDirective
  ]
})
export class SharedModule { }
