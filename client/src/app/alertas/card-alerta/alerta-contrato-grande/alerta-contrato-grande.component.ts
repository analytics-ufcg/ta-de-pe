import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerta-contrato-grande',
  templateUrl: './alerta-contrato-grande.component.html',
  styleUrls: ['./alerta-contrato-grande.component.scss']
})
export class AlertaContratoGrandeComponent implements OnInit {

  @Input() alerta;

  constructor() { }

  ngOnInit() {
  }
}
