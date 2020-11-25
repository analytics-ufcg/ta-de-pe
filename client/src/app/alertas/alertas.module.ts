import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AlertasRoutingModule } from './alertas-routing.module';
import { SharedModule } from '../shared/components/shared.module';
import { PipesModule } from '../shared/pipes/pipes.module';

import { AlertasComponent } from './alertas.component';
import { CardAlertaComponent } from './card-alerta/card-alerta.component';
import { FiltroAlertasComponent } from './filtro-alertas/filtro-alertas.component';

@NgModule({
  declarations: [AlertasComponent, CardAlertaComponent, FiltroAlertasComponent],
  imports: [
    CommonModule,
    FormsModule,
    AlertasRoutingModule,
    PipesModule,
    SharedModule,
    NgxPaginationModule,
    NgbModule
  ]
})
export class AlertasModule { }
