import { Component, OnInit, Input } from '@angular/core';

import { ContratoLicitacao } from 'src/app/shared/models/contratoLicitacao.model';

@Component({
  selector: 'app-contratos-vigentes',
  templateUrl: './contratos-vigentes.component.html',
  styleUrls: ['./contratos-vigentes.component.scss']
})
export class ContratosVigentesComponent implements OnInit {

  @Input() contratos: ContratoLicitacao[];

  constructor() { }

  ngOnInit() {
  }

}
