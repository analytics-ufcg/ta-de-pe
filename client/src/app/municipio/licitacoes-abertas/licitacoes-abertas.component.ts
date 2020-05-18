import { Component, OnInit, Input } from '@angular/core';
import { Licitacao } from 'src/app/shared/models/licitacao.model';

@Component({
  selector: 'app-licitacoes-abertas',
  templateUrl: './licitacoes-abertas.component.html',
  styleUrls: ['./licitacoes-abertas.component.scss']
})
export class LicitacoesAbertasComponent implements OnInit {

  @Input() licitacoes: Licitacao[];

  constructor() { }

  ngOnInit() {
  }

}
