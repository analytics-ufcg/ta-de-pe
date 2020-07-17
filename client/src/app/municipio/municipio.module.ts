import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxPaginationModule } from 'ngx-pagination';

import { MunicipioComponent } from './municipio.component';
import { MunicipioRoutingModule } from './municipio-routing.module';
import { FilterModule } from '../filter/filter.module';
import { LicitacoesComponent } from './licitacoes/licitacoes.component';
import { ContratosVigentesComponent } from './contratos-vigentes/contratos-vigentes.component';
import { NovidadesComponent } from './novidades/novidades.component';
import { SharedModule } from '../shared/components/shared.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { NovidadeComponent } from './novidades/novidade/novidade.component';

@NgModule({
  declarations: [
    MunicipioComponent,
    LicitacoesComponent,
    ContratosVigentesComponent,
    NovidadesComponent,
    NovidadeComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    MunicipioRoutingModule,
    FilterModule,
    SharedModule,
    PipesModule
  ]
})
export class MunicipioModule { }
