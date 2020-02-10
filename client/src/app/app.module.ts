import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {BuscaMunicipioModule} from './busca-municipio/busca-municipio.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [BuscaMunicipioModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
