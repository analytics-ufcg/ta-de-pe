import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-municipio',
  templateUrl: './filtro-municipio.component.html',
  styleUrls: ['./filtro-municipio.component.scss']
})
export class FiltroMunicipioComponent implements OnInit {
  @Output() filterChange = new EventEmitter<any>();

  estadoSelecionado: string;

  estadoFiltro: any[] = [
    { estado: 'Estados', estado_slug: '0' },
    { estado: 'PE', estado_slug: '26' },
    { estado: 'RS', estado_slug: '43' }];

  constructor(
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.estadoSelecionado = '0';
  }

  aplicarFiltroMunicipio() {
    const filtro = {
      estado: this.estadoSelecionado
    };
    this.filterChange.emit(filtro);
  }

  // updateFiltroViaURL() {
  //   this.activatedRoute.queryParams
  //     .subscribe(params => {
  //       const search = params.search;

  //       if (search !== undefined && search !== null) {
  //         this.aplicarFiltroMunicipio();
  //       }
  //     });
  // }

}
