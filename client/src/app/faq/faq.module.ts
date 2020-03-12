import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq.component';

import { FaqRoutingModule } from './faq-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [FaqComponent],
  imports: [
    CommonModule,
    NgbModule,
    FaqRoutingModule
  ]
})
export class FaqModule { }
