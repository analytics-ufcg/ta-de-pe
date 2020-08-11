import { FornecedoresRoutingModule } from './fornecedores-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoFornecedorComponent } from './info-fornecedor/info-fornecedor.component';



@NgModule({
  declarations: [InfoFornecedorComponent],
  imports: [
    CommonModule,
    FornecedoresRoutingModule
  ]
})
export class FornecedoresModule { }
