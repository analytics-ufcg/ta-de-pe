import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import {
  switchMap,
  map
} from 'rxjs/operators';

import { Novidade } from './../models/novidade.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NovidadeService {

  private url = environment.apiUrl + 'novidades';

  private searchfilters = new BehaviorSubject<any>({});

  private novidadesFiltered = new BehaviorSubject<Array<Novidade>>([]);
  private novidades = new BehaviorSubject<Array<Novidade>>([]);

  private TIPOS_LICITACAO = [1, 2, 3];
  private TIPOS_EMPENHO = [4, 5, 6, 7, 8, 9];
  private TIPOS_CONTRATO = [10, 11];

  constructor(private http: HttpClient) {
    this.novidades
      .pipe(
        switchMap(novidade =>
          this.searchfilters.pipe(
            map(filters => this.filter(novidade, filters))
          )
        )
      )
      .subscribe(res => {
        this.novidadesFiltered.next(res);
      });
  }

  getNovidadesPorMunicipio(municipio: string): Observable<Novidade[]> {
    const params = new HttpParams()
      .set('nome_municipio', municipio);
    this.http.get<Novidade[]>(this.url, { params })
      .subscribe(res => {
        this.novidades.next(res);
      });

    return this.novidadesFiltered.asObservable();
  }

  search(filters: any) {
    this.searchfilters.next(filters);
  }

  filter(novidade: Novidade[], filters: any) {

    const licitacao = filters.licitacao;
    const empenho = filters.empenho;
    const contrato = filters.contrato;

    return novidade.filter(p => {
      let filtered;

      filtered = licitacao ? this.TIPOS_LICITACAO.includes(p.id_tipo) : filtered;

      filtered = empenho ? this.TIPOS_EMPENHO.includes(p.id_tipo) : filtered;

      filtered = contrato ? this.TIPOS_CONTRATO.includes(p.id_tipo) : filtered;

      return filtered;
    });
  }

}
