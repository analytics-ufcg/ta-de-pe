import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitialCasePipe } from './initial-case.pipe';
import { FormatCpfCnpjPipe } from './format-cpf-cnpj.pipe';

@NgModule({
  declarations: [
    InitialCasePipe,
    FormatCpfCnpjPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InitialCasePipe,
    FormatCpfCnpjPipe
  ]
})
export class PipesModule { }
