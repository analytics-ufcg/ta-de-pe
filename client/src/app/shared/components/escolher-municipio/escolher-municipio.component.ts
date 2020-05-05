import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject, merge } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  take,
  map,
  filter
} from 'rxjs/operators';

import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

import { MunicipioService } from '../../services/municipio.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-escolher-municipio',
  templateUrl: './escolher-municipio.component.html',
  styleUrls: ['./escolher-municipio.component.scss']
})
export class EscolherMunicipioComponent implements OnInit, OnDestroy {
  @ViewChild('instance', { static: true }) instance: NgbTypeahead;

  private unsubscribe = new Subject();

  public placeholder = 'Escolha um município';
  public municipios: any[];
  public municipioSelecionado: string;

  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(
    private router: Router,
    private buscaMunicipioService: MunicipioService,
    private userService: UserService
  ) {
    this.municipios = [];
  }

  ngOnInit() {
    this.getMunicipios();
    this.getMunicipioSalvo();
  }

  getMunicipios() {
    this.buscaMunicipioService
      .getMunicipios()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(municipios => {
        this.municipios = municipios.map(e => e.nome_municipio).sort().slice(0, 10);
      });
  }

  getMunicipioSalvo() {
    this.userService
      .getMunicipioEscolhido()
      .pipe(take(1))
      .subscribe(municipio => {
        this.municipioSelecionado = municipio;
      });
  }

  salvarMunicipio(municipio: string) {
    this.userService.setMunicipioEscolhido(municipio);
  }

  removerMunicipio() {
    this.municipioSelecionado = '';
    this.userService.setMunicipioEscolhido(null);
  }

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click$.pipe(
      filter(() => !this.instance.isPopupOpen())
    );
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term =>
        term === ''
          ? this.municipios
          : this.municipios.filter(
              v => v.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
      )
    );
  }

  buscarOnClick() {
    if (this.municipioSelecionado !== '' && typeof this.municipioSelecionado !== 'undefined') {
      this.router.navigate(['novidades']);
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
