import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LicitacoesRoutingModule } from './licitacoes-routing.module';
import { LicitacoesDetalharComponent } from './licitacoes-detalhar/licitacoes-detalhar.component';
import { LicitacoesDetalharNavComponent } from './licitacoes-detalhar/licitacoes-detalhar-nav/licitacoes-nav.component';
import { LicitacoesDetalharInfoComponent } from './licitacoes-detalhar/licitacoes-detalhar-info/licitacoes-detalhar-info.component';
// tslint:disable-next-line: max-line-length
import { LicitacoesDetalharContratosComponent } from './licitacoes-detalhar/licitacoes-detalhar-contratos/licitacoes-detalhar-contratos.component';
import { TimelineComponent } from './licitacoes-detalhar/licitacoes-detalhar-info/timeline/timeline.component';
import { SharedModule } from '../shared/components/shared.module';
import { PipesModule } from '../shared/pipes/pipes.module';

@NgModule({
  declarations: [
    LicitacoesDetalharComponent,
    LicitacoesDetalharNavComponent,
    LicitacoesDetalharInfoComponent,
    LicitacoesDetalharContratosComponent,
    TimelineComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    LicitacoesRoutingModule,
    SharedModule,
    PipesModule
  ]
})
export class LicitacoesModule { }
