import { Component, OnInit, Input } from '@angular/core';
import { ContratoLicitacao } from '../../models/contratoLicitacao.model';

@Component({
  selector: 'app-lista-contratos',
  templateUrl: './lista-contratos.component.html',
  styleUrls: ['./lista-contratos.component.scss']
})
export class ListaContratosComponent implements OnInit {

  @Input() contratos: ContratoLicitacao;
  @Input() isLoading: boolean;

  constructor() { }

  ngOnInit() {
  }

}
