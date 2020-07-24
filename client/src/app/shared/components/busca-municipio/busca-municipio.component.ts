import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Observable, Subject, merge } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  map,
  filter
} from 'rxjs/operators';

import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

import { MunicipioService } from '../../services/municipio.service';
import { UserService } from '../../services/user.service';
import { Router, NavigationStart } from '@angular/router';

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
  public municipioDisplay: string;
  public show = false;
  public isURLHome = false;
  public navbarOpen = false;

  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(
    private router: Router,
    private buscaMunicipioService: MunicipioService,
    private userService: UserService
  ) {
    this.municipios = [];
    router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((route: NavigationStart) => {
        console.log(route);
        this.isURLHome = route.url === '/' || route.url === '/home';
    });
  }

  ngOnInit() {
    this.getMunicipios();
    this.getMunicipioSalvo();
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  getMunicipios() {
    this.buscaMunicipioService
      .getMunicipios()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(municipios => {
        this.municipios = municipios.map(e => e.nome_municipio).sort();
      });
  }

  getMunicipioSalvo() {
    this.userService
      .getMunicipioEscolhido()
      .subscribe(municipio => {
        this.municipioSelecionado = municipio;
        this.municipioDisplay = municipio;
      });
  }

  salvarMunicipio(municipio: string) {
    this.show = false;
    this.userService.setMunicipioEscolhido(municipio);
    this.router.navigate(['/municipio']);
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

  onClick() {
    this.router.navigate(['novidades']);
  }

  toggleShow() {
    this.show = !this.show;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
