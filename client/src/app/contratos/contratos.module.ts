import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratosRoutingModule } from './contratos-routing.module';
import { InfoContratoComponent } from './info-contrato/info-contrato.component';


@NgModule({
  declarations: [InfoContratoComponent],
  imports: [
    CommonModule,
    ContratosRoutingModule
  ]
})
export class ContratosModule { }
