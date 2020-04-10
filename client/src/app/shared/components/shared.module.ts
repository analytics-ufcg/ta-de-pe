import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EscolherMunicipioComponent } from './escolher-municipio/escolher-municipio.component';
import { BuscaMunicipioComponent } from './busca-municipio/busca-municipio.component';

@NgModule({
  declarations: [
    EscolherMunicipioComponent,
    BuscaMunicipioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  exports: [
    EscolherMunicipioComponent,
    BuscaMunicipioComponent
  ]
})
export class SharedModule { }
