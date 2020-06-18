import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoContratoComponent } from './info-contrato/info-contrato.component';

const routes: Routes = [
  {
    path: ':id',
    component: InfoContratoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContratosRoutingModule { }
