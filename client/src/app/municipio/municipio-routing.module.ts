import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MunicipioComponent } from './municipio.component';
import { LicitacoesAbertasComponent } from './licitacoes-abertas/licitacoes-abertas.component';
import { ContratosVigentesComponent } from './contratos-vigentes/contratos-vigentes.component';
import { NovidadesComponent } from './novidades/novidades.component';

const routes: Routes = [
  {
    path: '',
    component: MunicipioComponent,
    children: [
      {
        path: '',
        redirectTo: 'licitacoes',
        pathMatch: 'full'
      },
      {
        path: 'licitacoes',
        component: LicitacoesAbertasComponent
      },
      {
        path: 'contratos',
        component: ContratosVigentesComponent
      },
      {
        path: 'acontecimentos',
        component: NovidadesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MunicipioRoutingModule { }
