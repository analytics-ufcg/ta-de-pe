import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ContratoService } from '../../shared/services/contrato.service';
import { ContratoLicitacao } from '../../shared/models/contratoLicitacao.model';
import { MunicipioService } from '../../shared/services/municipio.service';

@Component({
  selector: 'app-contratos-vigentes',
  templateUrl: './contratos-vigentes.component.html',
  styleUrls: ['./contratos-vigentes.component.scss']
})
export class ContratosVigentesComponent implements OnInit {

  private unsubscribe = new Subject();

  public contratosVigentes$: Observable<ContratoLicitacao[]>;
  public loading$ = new BehaviorSubject<boolean>(true);

  constructor(
    private contratoService: ContratoService,
    private municipioService: MunicipioService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.parent.paramMap
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(params => {
        const slug = params.get('slug');
        if (slug !== undefined && slug !== null) {
          this.municipioService.getBySlug(slug).subscribe(municipio => {
            this.contratosVigentes$ = this.contratoService.getVigentes(municipio.cd_municipio_ibge);
            this.loading$.next(false);
          })
        }
      });
  }
}
