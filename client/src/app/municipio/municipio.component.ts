import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.scss']
})
export class MunicipioComponent implements OnInit {

  private unsubscribe = new Subject();

  public municipioEscolhido: string;
  public siglaEstadoEscolhido: string;

  public slug: string;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    this.getMunicipio();
    this.getSiglaEstado();
  }

  getMunicipio() {
    //
    this.activatedRoute.paramMap.pipe(takeUntil(this.unsubscribe)).subscribe(param => {
      this.slug = param.get('slug');

      if (this.slug !== undefined) {
        this.userService
          .getMunicipioEscolhido()
          .pipe(
            debounceTime(300),
            takeUntil(this.unsubscribe))
          .subscribe(municipio => {
            this.municipioEscolhido = municipio;
          });
      }
    });
  }

  getSiglaEstado() {
    this.userService
      .getSiglaEstadoEscolhido()
      .pipe(
        debounceTime(300),
        takeUntil(this.unsubscribe))
      .subscribe(siglaEstado => {
        this.siglaEstadoEscolhido = siglaEstado;
      });
  }

}
