import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItensRoutingModule } from './itens-routing.module';
import { InfoItemComponent } from './info-item/info-item.component';


@NgModule({
  declarations: [InfoItemComponent],
  imports: [
    CommonModule,
    ItensRoutingModule
  ]
})
export class ItensModule { }
