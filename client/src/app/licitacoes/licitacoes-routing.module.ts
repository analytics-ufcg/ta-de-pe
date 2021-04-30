import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicitacoesDetalharComponent } from './licitacoes-detalhar/licitacoes-detalhar.component';
import { LicitacoesDetalharInfoComponent } from './licitacoes-detalhar/licitacoes-detalhar-info/licitacoes-detalhar-info.component';
import { LicitacoesDetalharItensComponent } from './licitacoes-detalhar/licitacoes-detalhar-itens/licitacoes-detalhar-itens.component';
// tslint:disable-next-line: max-line-length
import { LicitacoesDetalharContratosComponent } from './licitacoes-detalhar/licitacoes-detalhar-contratos/licitacoes-detalhar-contratos.component';

const routes: Routes = [
  {
    path: ':id',
    component: LicitacoesDetalharComponent,
    children: [
      {
        path: '',
        redirectTo: 'info',
        pathMatch: 'full'
      },
      {
        path: 'info',
        component: LicitacoesDetalharInfoComponent
      },
      {
        path: 'contratos',
        component: LicitacoesDetalharContratosComponent
      },
      {
        path: 'itens',
        component: LicitacoesDetalharItensComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicitacoesRoutingModule { }
