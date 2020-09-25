import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscaGeralComponent } from './busca-geral/busca-geral.component';

const routes: Routes = [
  {
    path: '',
    component: BuscaGeralComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuscaRoutingModule { }
