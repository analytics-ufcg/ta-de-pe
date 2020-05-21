import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Novidade } from 'src/app/shared/models/novidade.model';
import { NovidadeService } from 'src/app/shared/services/novidade.service';

@Component({
  selector: 'app-novidade',
  templateUrl: './novidade.component.html',
  styleUrls: ['./novidade.component.scss']
})
export class NovidadeComponent {

  @Input() novidade: Novidade;
  @Input() showMunicipio: boolean;

  constructor(private router: Router, public novidadeService: NovidadeService) { }

  handleClick() {
    if (this.novidadeService.isContrato(this.novidade.id_tipo)) {
      this.router.navigate(['/licitacoes/' + this.novidade.licitacaoNovidade.id_licitacao + '/contratos'],
        { queryParams: { id: this.novidade.id_original }
      });
    } else if (this.novidadeService.isEmpenho(this.novidade.id_tipo)) {
      this.router.navigate(['/licitacoes/' + this.novidade.licitacaoNovidade.id_licitacao + '/info'],
        { queryParams: { id: this.novidade.id_original }
      });
    } else {
      this.router.navigate(['/licitacoes/' + this.novidade.licitacaoNovidade.id_licitacao]);
    }
  }

}
