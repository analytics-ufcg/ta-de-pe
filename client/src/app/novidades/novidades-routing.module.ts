import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovidadesComponent } from './novidades.component';

const routes: Routes = [
  {
    path: '',
    component: NovidadesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NovidadesRoutingModule { }
