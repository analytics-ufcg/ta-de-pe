import { AlertaService } from './../../../shared/services/alerta.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerta-abertura-empresa',
  templateUrl: './alerta-abertura-empresa.component.html',
  styleUrls: ['./alerta-abertura-empresa.component.scss']
})
export class AlertaAberturaEmpresaComponent implements OnInit {

  @Input() alerta;

  constructor(private alertaService: AlertaService) { }

  ngOnInit() {
  }

}
