import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alerta-item-atipico',
  templateUrl: './alerta-item-atipico.component.html',
  styleUrls: ['./alerta-item-atipico.component.scss']
})
export class AlertaItemAtipicoComponent {

  @Input() alerta;

  constructor() { }

}
