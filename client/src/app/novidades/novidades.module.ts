import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NovidadesComponent } from './novidades.component';
import { NovidadesRoutingModule } from './novidades-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NovidadesComponent],
  imports: [
    CommonModule,
    NovidadesRoutingModule,
    SharedModule
  ]
})
export class NovidadesModule { }
