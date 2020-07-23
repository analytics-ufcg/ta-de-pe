import { Component, OnInit, Input } from '@angular/core';

import { ItensContrato } from '../../models/itensContrato.model';

@Component({
  selector: 'app-descricao-item',
  templateUrl: './descricao-item.component.html',
  styleUrls: ['./descricao-item.component.scss']
})
export class DescricaoItemComponent implements OnInit {

  @Input() item: ItensContrato;
  @Input() temLink: boolean;
  @Input() itemResumido = true;
  @Input() comUnidade = true;

  constructor() { }

  ngOnInit() {
    this.item.resumido = this.itemResumido;
  }

}
