import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicitacoesListarComponent } from './licitacoes-listar/licitacoes-listar.component';
import { LicitacoesDetalharComponent } from './licitacoes-detalhar/licitacoes-detalhar.component';

const routes: Routes = [
  {
    path: '',
    component: LicitacoesListarComponent
  },
  {
    path: 'detalhar/:id',
    component: LicitacoesDetalharComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicitacoesRoutingModule { }
