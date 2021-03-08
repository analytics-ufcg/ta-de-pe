import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-barra-titulo',
  templateUrl: './barra-titulo.component.html',
  styleUrls: ['./barra-titulo.component.scss']
})
export class BarraTituloComponent implements OnInit {

  @Input() titulo: string;
  @Input() subtitulo: string;
  @Input() exibirVoltar = false;
  @Input() exibirTooltip = false;
  @Input() textoTooltip = '';

  constructor(private location: Location) { }

  ngOnInit() { }

  voltar() {
    this.location.back();
  }

}
