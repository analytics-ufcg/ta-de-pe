import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscaMunicipioModule } from './components/busca-municipio/busca-municipio.module';
import { FilterModule } from '../filter/filter.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BuscaMunicipioModule,
    FilterModule
  ],
  providers: [
    BuscaMunicipioModule,
    FilterModule
  ],
  exports: [
    BuscaMunicipioModule,
    FilterModule
  ]
})
export class SharedModule { }
