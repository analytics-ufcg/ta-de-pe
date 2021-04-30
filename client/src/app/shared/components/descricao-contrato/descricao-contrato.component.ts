import { Component, OnInit, Input } from '@angular/core';

import { ResumirTextoPipe } from '../../pipes/resumir-texto.pipe';
import { ContratoLicitacao } from './../../models/contratoLicitacao.model';

@Component({
  selector: 'app-descricao-contrato',
  templateUrl: './descricao-contrato.component.html',
  styleUrls: ['./descricao-contrato.component.scss'],
  providers: [
    ResumirTextoPipe
  ]
})
export class DescricaoContratoComponent implements OnInit {

  @Input() contrato: ContratoLicitacao;
  @Input() termoHighlight = '';
  @Input() resumido = true;
  public resumo = '';

  constructor(private resumirPipe: ResumirTextoPipe) { }

  ngOnInit() {
    this.contrato.resumido = this.resumido;
    this.resumo = this.resumirPipe.transform(this.contrato.descricao_objeto_contrato);
  }

}
