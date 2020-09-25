import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscaGeralComponent } from './busca-geral/busca-geral.component';
import { BuscaRoutingModule } from './busca-routing.module';
import { SharedModule } from '../shared/components/shared.module';

@NgModule({
  declarations: [
    BuscaGeralComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BuscaRoutingModule
  ]
})
export class BuscaModule { }
