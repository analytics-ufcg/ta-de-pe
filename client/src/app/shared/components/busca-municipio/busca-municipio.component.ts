import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, take, map, filter } from 'rxjs/operators';

import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

import { MunicipioService } from '../../services/municipio.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-busca-municipio',
  templateUrl: './busca-municipio.component.html',
  styleUrls: ['./busca-municipio.component.scss']
})

export class BuscaMunicipioComponent implements OnInit, OnDestroy {

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;

  private unsubscribe = new Subject();

  public placeholder = 'Escolha um município';
  public municipios: any[];
  public municipioSelecionado: string;

  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(
    private buscaMunicipioService: MunicipioService,
    private userService: UserService) {
    this.municipios = [];
  }

  ngOnInit() {
    this.getMunicipios();
    this.getMunicipioSalvo();
  }

  getMunicipios() {
    this.buscaMunicipioService.getMunicipios()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(municipios => {
        this.municipios = municipios.map(e => e.nome_municipio).sort();
      });
  }

  getMunicipioSalvo() {
    this.userService.getMunicipioEscolhido()
    .pipe(take(1))
    .subscribe(municipio => {
      this.municipioSelecionado = municipio;
    });
  }

  salvaMunicipio(municipio: string) {
    this.userService.setMunicipioEscolhido(municipio);
  }

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.municipios
        : this.municipios.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)))
    );
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
