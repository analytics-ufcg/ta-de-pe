import { ContratoLicitacao } from './../../models/contratoLicitacao.model';

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-descricao-contrato',
  templateUrl: './descricao-contrato.component.html',
  styleUrls: ['./descricao-contrato.component.scss']
})
export class DescricaoContratoComponent implements OnInit {

  @Input() contrato: ContratoLicitacao;
  @Input() termoHighlight = '';
  @Input() resumido = true;

  constructor() { }

  ngOnInit() {
    this.contrato.resumido = this.resumido;
  }

}
