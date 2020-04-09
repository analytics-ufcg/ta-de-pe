import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxPaginationModule } from 'ngx-pagination';

import { NovidadesRoutingModule } from './novidades-routing.module';
import { FilterModule } from '../filter/filter.module';
import { NovidadesComponent } from './novidades.component';
import { NovidadeComponent } from './novidade/novidade.component';

@NgModule({
  declarations: [
    NovidadesComponent, NovidadeComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    NovidadesRoutingModule,
    FilterModule
  ]
})
export class NovidadesModule { }
