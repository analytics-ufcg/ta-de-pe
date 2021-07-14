import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Alerta } from 'src/app/shared/models/alerta.model';

@Component({
  selector: 'app-card-alerta',
  templateUrl: './card-alerta.component.html',
  styleUrls: ['./card-alerta.component.scss']
})
export class CardAlertaComponent {

  public TIPOS_ALERTAS_FORNECEDORES = [3];

  @Input() alerta: Alerta;

  constructor(private router: Router) { }

  getStyleCard(idAlerta) {
    if (1 === idAlerta) {
      return { 'cor-borda-esquerda-abertura-empresa': true };
    } else if (2 === idAlerta) {
      return { 'cor-borda-esquerda-item-atipico': true };
    } else if (3 === idAlerta) {
      return { 'cor-borda-esquerda-inidoneo': true };
    }
  }

  onClickCard(idContrato, nrDocumento, tipoAlerta) {
    if (idContrato) {
      this.router.navigate(['/contratos/' + idContrato]);
    } else if (nrDocumento && this.TIPOS_ALERTAS_FORNECEDORES.includes(tipoAlerta)) {
      this.router.navigate(['/fornecedores/' + nrDocumento]);
    }
  }

}
