import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LicitacoesListarComponent } from './licitacoes-listar/licitacoes-listar.component';
import { LicitacoesRoutingModule } from './licitacoes-routing.module';
import { LicitacoesDetalharComponent } from './licitacoes-detalhar/licitacoes-detalhar.component';
import { LicitacoesDetalharNavComponent } from './licitacoes-detalhar/licitacoes-detalhar-nav/licitacoes-nav.component';
import { LicitacoesDetalharInfoComponent } from './licitacoes-detalhar/licitacoes-detalhar-info/licitacoes-detalhar-info.component';
import { LicitacoesDetalharItensComponent } from './licitacoes-detalhar/licitacoes-detalhar-itens/licitacoes-detalhar-itens.component';
// tslint:disable-next-line: max-line-length
import { LicitacoesDetalharContratosComponent } from './licitacoes-detalhar/licitacoes-detalhar-contratos/licitacoes-detalhar-contratos.component';
import { FornecedoresInfoComponent } from './licitacoes-detalhar/licitacoes-detalhar-info/fornecedores-info/fornecedores-info.component';
import { TimelineComponent } from './licitacoes-detalhar/licitacoes-detalhar-info/timeline/timeline.component';

@NgModule({
  declarations: [
    LicitacoesListarComponent,
    LicitacoesDetalharComponent,
    LicitacoesDetalharNavComponent,
    LicitacoesDetalharInfoComponent,
    LicitacoesDetalharItensComponent,
    LicitacoesDetalharContratosComponent,
    FornecedoresInfoComponent,
    TimelineComponent],
  imports: [
    CommonModule,
    NgbModule,
    LicitacoesRoutingModule
  ]
})
export class LicitacoesModule { }
