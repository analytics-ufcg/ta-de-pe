import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EscolherMunicipioComponent } from './escolher-municipio/escolher-municipio.component';
import { BuscaMunicipioComponent } from './busca-municipio/busca-municipio.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ProgressComponent } from './progress/progress.component';

@NgModule({
  declarations: [
    EscolherMunicipioComponent,
    BuscaMunicipioComponent,
    SpinnerComponent,
    ProgressComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule
  ],
  exports: [
    EscolherMunicipioComponent,
    BuscaMunicipioComponent,
    SpinnerComponent,
    ProgressComponent
  ]
})
export class SharedModule { }
