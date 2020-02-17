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
  public municipioEscolhido: string;

  constructor(private novidadesServices: NovidadeService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.getMunicipio();
    this.getNovidades(this.municipioEscolhido);
  }


  getMunicipio() {
    this.userService.getMunicipioEscolhido()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(municipio => this.municipioEscolhido = municipio);
  }

  getNovidades(municipio: string) {
    this.novidadesServices.getNovidadesPorMunicipio(municipio)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(novidades => this.novidades = novidades);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
