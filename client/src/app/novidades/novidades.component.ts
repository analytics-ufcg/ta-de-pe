import { UserService } from './../shared/services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Novidade } from '../shared/models/novidade.model';
import { NovidadeService } from '../shared/services/novidade.service';


@Component({
  selector: 'app-novidades',
  templateUrl: './novidades.component.html',
  styleUrls: ['./novidades.component.scss']
})
export class NovidadesComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject();

  public novidades: Novidade[];
  public novidadesTipo: Novidade[];
  public municipioEscolhido: string;

  filtro: any;

  constructor(private novidadesServices: NovidadeService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.getMunicipio();
  }

  getMunicipio() {
    this.userService.getMunicipioEscolhido()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(municipio => {
        this.municipioEscolhido = municipio;
        this.getNovidades(this.municipioEscolhido);
      });
  }

  getNovidades(municipio: string) {
    this.novidadesServices.getNovidadesPorMunicipio(municipio)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(novidades => this.novidades = novidades);
  }

  search(filtro: any) {
    this.novidadesServices.search(filtro);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
