import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscaComponent } from './busca.component';
import { BuscaItemComponent } from './busca-item/busca-item.component';
import { BuscaCompraComponent } from './busca-compra/busca-compra.component';

const routes: Routes = [
  {
    path: '',
    component: BuscaComponent,
    children: [
      {
        path: '',
        redirectTo: 'produto',
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuscaRoutingModule { }
