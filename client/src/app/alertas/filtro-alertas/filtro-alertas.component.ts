import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filtro-alertas',
  templateUrl: './filtro-alertas.component.html',
  styleUrls: ['./filtro-alertas.component.scss']
})
export class FiltroAlertasComponent implements OnInit {

  @Output() filterChange = new EventEmitter<any>();

  nomePesquisado: string;

  constructor() { }

  ngOnInit() {
  }

  aplicarFiltro() {
    const filtro = {
      nomePesquisado: this.nomePesquisado
    };

    this.filterChange.emit(filtro);
  }

}
