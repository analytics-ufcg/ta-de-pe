import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscaComponent } from './busca.component';
import { BuscaItemComponent } from './busca-item/busca-item.component';
import { BuscaCompraComponent } from './busca-compra/busca-compra.component';
import { BuscaMunicipioComponent } from './busca-municipio/busca-municipio.component';

const routes: Routes = [
  {
    path: '',
    component: BuscaComponent,
    children: [
      {
        path: '',
        redirectTo: 'municipio',
        pathMatch: 'full'
      },
      {
        path: 'contrato',
        component: BuscaCompraComponent
      },
      {
        path: 'produto',
        component: BuscaItemComponent
      },
      {
        path: 'municipio',
        component: BuscaMunicipioComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuscaRoutingModule { }
