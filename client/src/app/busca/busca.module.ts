import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';


import { BuscaRoutingModule } from './busca-routing.module';
import { SharedModule } from '../shared/components/shared.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { BuscaCompraComponent } from './busca-compra/busca-compra.component';
import { BuscaItemComponent } from './busca-item/busca-item.component';
import { BuscaComponent } from './busca.component';
import { BuscaMunicipioComponent } from './busca-municipio/busca-municipio.component';
import { BuscaFornecedorComponent } from './busca-fornecedor/busca-fornecedor.component';

@NgModule({
  declarations: [
    BuscaCompraComponent,
    BuscaItemComponent,
    BuscaComponent,
    BuscaMunicipioComponent,
    BuscaFornecedorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    BuscaRoutingModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule
  ]
})
export class BuscaModule { }
