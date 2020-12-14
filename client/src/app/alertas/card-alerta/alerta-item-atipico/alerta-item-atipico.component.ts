import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerta-item-atipico',
  templateUrl: './alerta-item-atipico.component.html',
  styleUrls: ['./alerta-item-atipico.component.scss']
})
export class AlertaItemAtipicoComponent implements OnInit {

  @Input() alerta;

  constructor() { }

  ngOnInit() {
  }

}
