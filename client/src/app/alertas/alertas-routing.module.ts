import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlertasComponent } from './alertas.component';

const routes: Routes = [
  {
    path: '',
    component: AlertasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertasRoutingModule { }
