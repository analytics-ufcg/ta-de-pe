import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MunicipioComponent } from './municipio.component';
import { MunicipioRoutingModule } from './municipio-routing.module';
import { LicitacoesAbertasComponent } from './licitacoes-abertas/licitacoes-abertas.component';
import { ContratosVigentesComponent } from './contratos-vigentes/contratos-vigentes.component';
import { PipesModule } from '../shared/pipes/pipes.module';

@NgModule({
  declarations: [
    MunicipioComponent,
    LicitacoesAbertasComponent,
    ContratosVigentesComponent
  ],
  imports: [
    CommonModule,
    MunicipioRoutingModule,
    PipesModule
  ]
})
export class MunicipioModule { }
