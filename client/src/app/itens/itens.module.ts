import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItensRoutingModule } from './itens-routing.module';
import { InfoItemComponent } from './info-item/info-item.component';
import { SharedModule } from '../shared/components/shared.module';
import { PipesModule } from '../shared/pipes/pipes.module';


@NgModule({
  declarations: [InfoItemComponent],
  imports: [
    CommonModule,
    ItensRoutingModule,
    SharedModule,
    PipesModule
  ]
})
export class ItensModule { }
