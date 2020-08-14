import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoFornecedorComponent } from './info-fornecedor/info-fornecedor.component';


const routes: Routes = [
  {
    path: ':id',
    component: InfoFornecedorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedoresRoutingModule { }
