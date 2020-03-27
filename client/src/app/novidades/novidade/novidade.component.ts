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
    this.router.navigate(['/licitacoes/' + this.novidade.licitacaoNovidade.id_licitacao]);
  }

}
