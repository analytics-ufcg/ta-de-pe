import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscaMunicipioModule } from './components/busca-municipio/busca-municipio.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BuscaMunicipioModule
  ],
  providers: [
    BuscaMunicipioModule
  ],
  exports: [
    BuscaMunicipioModule
  ]
})
export class SharedModule { }
