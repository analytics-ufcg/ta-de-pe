import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-alertas',
  templateUrl: './filtro-alertas.component.html',
  styleUrls: ['./filtro-alertas.component.scss']
})
export class FiltroAlertasComponent implements OnInit {

  @Output() filterChange = new EventEmitter<any>();

  nomePesquisado: string;
  estadoSelecionado: string;

  estadoFiltro: any[] = [
    { estado: 'Estados', estado_slug: '0' },
    { estado: 'PE', estado_slug: '26' },
    { estado: 'RS', estado_slug: '43' }];

  constructor(
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.estadoSelecionado = '0';
    this.updateFiltroViaURL();
  }

  aplicarFiltro() {
    const filtro = {
      nomePesquisado: this.nomePesquisado,
      estado: this.estadoSelecionado
    };
    this.filterChange.emit(filtro);
  }

  updateFiltroViaURL() {
    this.activatedRoute.queryParams
      .subscribe(params => {
        const search = params.search;

        if (search !== undefined && search !== null) {
          this.nomePesquisado = search;
          this.aplicarFiltro();
        }
      });
  }

}
