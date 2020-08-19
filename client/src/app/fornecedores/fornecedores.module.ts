import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/components/shared.module';
import { PipesModule } from './../shared/pipes/pipes.module';
import { FornecedoresRoutingModule } from './fornecedores-routing.module';

import { InfoFornecedorComponent } from './info-fornecedor/info-fornecedor.component';



@NgModule({
  declarations: [
    InfoFornecedorComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    FornecedoresRoutingModule,
    SharedModule,
    PipesModule
  ]
})
export class FornecedoresModule { }
