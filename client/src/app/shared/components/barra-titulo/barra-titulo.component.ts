import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-barra-titulo',
  templateUrl: './barra-titulo.component.html',
  styleUrls: ['./barra-titulo.component.scss']
})
export class BarraTituloComponent implements OnInit {

  @Input() titulo: string;
  @Input() subtitulo: string;
  @Input() exibirVoltar = false;

  constructor() { }

  ngOnInit() {
  }

}
