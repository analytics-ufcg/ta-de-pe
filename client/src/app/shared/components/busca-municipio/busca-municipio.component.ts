import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MunicipioService } from '../../services/municipio.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-busca-municipio',
  templateUrl: './busca-municipio.component.html',
  styleUrls: ['./busca-municipio.component.scss']
})

export class BuscaMunicipioComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject();

  public placeholder = 'Escolha um município';
  public keyword = 'name';

  public municipios: any[];

  constructor(
    private buscaMunicipioService: MunicipioService,
    private userService: UserService) {
    this.municipios = [];
  }

  ngOnInit() {
    this.getMunicipios();
  }

  submitTemplateForm(value) {
    console.log(value);
  }

  getMunicipios() {
    this.buscaMunicipioService.getMunicipios()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(municipios => {
        this.municipios = municipios.map(e => e.nome_municipio).sort();
      });
  }

  salvaMunicipio(municipio: string) {
    this.userService.setMunicipioEscolhido(municipio);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
