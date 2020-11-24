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

  constructor(
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.updateFiltroViaURL();
  }

  aplicarFiltro() {
    const filtro = {
      nomePesquisado: this.nomePesquisado
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
