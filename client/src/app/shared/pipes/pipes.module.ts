import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitialCasePipe } from './initial-case.pipe';
import { FormatCpfCnpjPipe } from './format-cpf-cnpj.pipe';
import { ResumirTextoPipe } from './resumir-texto.pipe';

@NgModule({
  declarations: [
    InitialCasePipe,
    FormatCpfCnpjPipe,
    ResumirTextoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InitialCasePipe,
    FormatCpfCnpjPipe,
    ResumirTextoPipe
  ]
})
export class PipesModule { }
