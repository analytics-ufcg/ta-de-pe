import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { LicitacoesListarComponent } from './licitacoes-listar/licitacoes-listar.component';
import { LicitacoesRoutingModule } from './licitacoes-routing.module';
import { LicitacoesDetalharComponent } from './licitacoes-detalhar/licitacoes-detalhar.component';

@NgModule({
  declarations: [LicitacoesListarComponent, LicitacoesDetalharComponent],
  imports: [
    CommonModule,
    NgbModule,
    LicitacoesRoutingModule
  ]
})
export class LicitacoesModule { }
