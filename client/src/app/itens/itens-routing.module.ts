import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoItemComponent } from './info-item/info-item.component';


const routes: Routes = [
  {
    path: ':id',
    component: InfoItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItensRoutingModule { }
