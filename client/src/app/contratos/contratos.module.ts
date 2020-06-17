import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ContratosRoutingModule } from './contratos-routing.module';
import { InfoContratoComponent } from './info-contrato/info-contrato.component';
import { SharedModule } from '../shared/components/shared.module';
import { PipesModule } from '../shared/pipes/pipes.module';

@NgModule({
  declarations: [InfoContratoComponent],
  imports: [
    CommonModule,
    ContratosRoutingModule,
    SharedModule,
    PipesModule,
    NgbModule,
    ReactiveFormsModule,
  ]
})
export class ContratosModule { }
