import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MunicipioComponent } from './municipio.component';
import { MunicipioRoutingModule } from './municipio-routing.module';
import { LicitacoesAbertasComponent } from './licitacoes-abertas/licitacoes-abertas.component';
import { ContratosVigentesComponent } from './contratos-vigentes/contratos-vigentes.component';
import { SharedModule } from '../shared/components/shared.module';
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
    SharedModule,
    PipesModule
  ]
})
export class MunicipioModule { }
