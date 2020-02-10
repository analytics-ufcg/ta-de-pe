import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgModule } from '@angular/core';

import { BuscaMunicipioComponent } from './busca-municipio.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BuscaMunicipioComponent],
  imports: [ReactiveFormsModule,
    FormsModule,
    AutocompleteLibModule],
  exports: [BuscaMunicipioComponent]
})
export class BuscaMunicipioModule { }