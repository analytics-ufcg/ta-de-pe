import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, map, filter } from 'rxjs/operators';

import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

import { MunicipioService } from '../../services/municipio.service';
import { UserService } from '../../services/user.service';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
  selector: 'app-busca-municipio',
  templateUrl: './busca-municipio.component.html',
  styleUrls: ['./busca-municipio.component.scss']
})

export class BuscaMunicipioComponent implements OnInit, OnDestroy {

  @ViewChild('instance', {static: true}) instance: NgbTypeahead;

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
