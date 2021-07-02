import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Municipio } from '../shared/models/municipio.model';
import { MunicipioService } from '../shared/services/municipio.service';

@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.scss']
})
export class MunicipioComponent implements OnInit {

  private unsubscribe = new Subject();

  public municipio: Municipio;

  constructor(
    private activatedRoute: ActivatedRoute,
    private municipioService: MunicipioService) { }


  ngOnInit() {
    this.getMunicipio();
  }

  getMunicipio() {
    this.activatedRoute.paramMap.pipe(takeUntil(this.unsubscribe))
    .subscribe(param => {
      const slug = param.get('slug');

      if (slug !== undefined) {
        this.municipioService.getBySlug(slug).subscribe(municipio => {
          this.municipio = municipio;
        });
      }
    });
  }
}
