import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxPaginationModule } from 'ngx-pagination';

import { NovidadesComponent } from './novidades.component';
import { NovidadesRoutingModule } from './novidades-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NovidadeComponent } from './novidade/novidade.component';

@NgModule({
  declarations: [NovidadesComponent, NovidadeComponent],
  imports: [
    CommonModule,
    NovidadesRoutingModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class NovidadesModule { }
