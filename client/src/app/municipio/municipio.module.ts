import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MunicipioComponent } from './municipio.component';
import { MunicipioRoutingModule } from './municipio-routing.module';
import { LicitacoesAbertasComponent } from './licitacoes-abertas/licitacoes-abertas.component';
import { ContratosVigentesComponent } from './contratos-vigentes/contratos-vigentes.component';

@NgModule({
  declarations: [MunicipioComponent, LicitacoesAbertasComponent, ContratosVigentesComponent],
  imports: [
    CommonModule,
    MunicipioRoutingModule
  ]
})
export class MunicipioModule { }
