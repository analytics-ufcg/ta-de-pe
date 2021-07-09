import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Subject } from 'rxjs';
import {
  filter
} from 'rxjs/operators';

import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

import { MunicipioService } from '../../services/municipio.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-busca-municipio',
  templateUrl: './busca-municipio.component.html',
  styleUrls: ['./busca-municipio.component.scss']
})
export class BuscaMunicipioComponent implements OnInit, OnDestroy {
  @ViewChild('instance', { static: true }) instance: NgbTypeahead;

  private unsubscribe = new Subject();

  public municipioSelecionado: string;
  public municipioDisplay: string;
  public show = false;
  public isURLHome = false;
  public navbarOpen = false;

  constructor(
    private router: Router,
    private buscaMunicipioService: MunicipioService
  ) {
    router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((route: NavigationStart) => {
        this.isURLHome = route.url === '/' || route.url === '/home';
    });
  }

  ngOnInit() {}

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  reciverSelecionado(buscavelSelecionado) {
    this.show = false;
  }

  toggleShow() {
    this.show = !this.show;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
