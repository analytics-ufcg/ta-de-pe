import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicitacoesListarComponent } from './licitacoes-listar/licitacoes-listar.component';
import { LicitacoesRoutingModule } from './licitacoes-routing.module';
import { LicitacoesDetalharComponent } from './licitacoes-detalhar/licitacoes-detalhar.component';

@NgModule({
  declarations: [LicitacoesListarComponent, LicitacoesDetalharComponent],
  imports: [
    CommonModule,
    LicitacoesRoutingModule
  ]
})
export class LicitacoesModule { }
