import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { NovidadesComponent } from './novidades/novidades.component';

import { BuscaMunicipioModule } from '../busca-municipio/busca-municipio.module'


@NgModule({
  declarations: [
    HomeComponent,
    NovidadesComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    BuscaMunicipioModule
  ],
  providers: [BuscaMunicipioModule]
})
export class MainModule { }
