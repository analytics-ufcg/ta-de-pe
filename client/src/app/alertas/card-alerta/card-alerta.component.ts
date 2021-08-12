import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Alerta } from 'src/app/shared/models/alerta.model';

@Component({
  selector: 'app-card-alerta',
  templateUrl: './card-alerta.component.html',
  styleUrls: ['./card-alerta.component.scss']
})
export class CardAlertaComponent {

  @Input() alerta: Alerta;
  // tipos de alerta do fornecedor
  readonly ALERTAS_FORNECEDOR = [4];

  constructor(private router: Router) { }

  getStyleCard(idAlerta) {
    if (1 === idAlerta) {
      return { 'cor-borda-esquerda-abertura-empresa': true };
    } else if (2 === idAlerta) {
      return { 'cor-borda-esquerda-item-atipico': true };
    } else if (3 === idAlerta) {
      return { 'cor-borda-esquerda-inidoneo': true };
    } else if (4 === idAlerta) {
      return { 'cor-borda-esquerda-contratos-grandes': true };
    }
  }



  onClickCard(nrDocumento, idContrato) {
    if (nrDocumento) {
      this.router.navigate(['/fornecedores/' + nrDocumento]);
    }
    if (idContrato) {
      this.router.navigate(['/contratos/' + idContrato]);
    }
  }
}
