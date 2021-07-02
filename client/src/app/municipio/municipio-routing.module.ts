import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MunicipioComponent } from './municipio.component';
import { LicitacoesComponent } from './licitacoes/licitacoes.component';
import { ContratosVigentesComponent } from './contratos-vigentes/contratos-vigentes.component';
import { NovidadesComponent } from './novidades/novidades.component';

const routes: Routes = [
  {
    path: ':slug',
    component: MunicipioComponent,
    children: [
      {
        path: '',
        redirectTo: 'contratos',
        pathMatch: 'full'
      },
      {
        path: 'contratos',
        component: ContratosVigentesComponent
      },
      {
        path: 'licitacoes',
        component: LicitacoesComponent
      },
      {
        path: 'linha-do-tempo',
        component: NovidadesComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MunicipioRoutingModule { }
