import { BuscaItemComponent } from './busca-item/busca-item.component';
import { BuscaCompraComponent } from './busca-compra/busca-compra.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'compra',
        component: BuscaCompraComponent
      },
      {
        path: 'item',
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
