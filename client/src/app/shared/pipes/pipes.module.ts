import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitialCasePipe } from './initial-case.pipe';
import { FormatCpfCnpjPipe } from './format-cpf-cnpj.pipe';
import { ResumirTextoPipe } from './resumir-texto.pipe';
import { TermosImportantesPipe } from './termos-importantes.pipe';
import { FilterUniqueAlertasPipe } from './filter-unique-alertas.pipe';

@NgModule({
  declarations: [
    InitialCasePipe,
    FormatCpfCnpjPipe,
    ResumirTextoPipe,
    TermosImportantesPipe,
    FilterUniqueAlertasPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InitialCasePipe,
    FormatCpfCnpjPipe,
    ResumirTextoPipe,
    TermosImportantesPipe,
    FilterUniqueAlertasPipe
  ]
})
export class PipesModule { }
