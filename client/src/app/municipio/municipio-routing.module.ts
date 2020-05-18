import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MunicipioComponent } from './municipio.component';

const routes: Routes = [
  {
    path: '',
    component: MunicipioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MunicipioRoutingModule { }
