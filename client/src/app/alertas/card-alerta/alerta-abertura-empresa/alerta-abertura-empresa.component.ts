import { AlertaService } from './../../../shared/services/alerta.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerta-abertura-empresa',
  templateUrl: './alerta-abertura-empresa.component.html',
  styleUrls: ['./alerta-abertura-empresa.component.scss']
})
export class AlertaAberturaEmpresaComponent implements OnInit {

  @Input() alerta;
  diferencaAbertura: number;

  constructor(private alertaService: AlertaService) { }

  ngOnInit() {
    this.diferencaAbertura = this.diffAberturaEmpresaContrato(this.alerta);
  }

  diffAberturaEmpresaContrato(alerta) {
    return this.alertaService.diffAberturaEmpresaContrato(alerta.alertaDadosFornecedorReceita.data_inicio_atividade,
      alerta.alertaFornecedor.data_primeiro_contrato);
  }

}
