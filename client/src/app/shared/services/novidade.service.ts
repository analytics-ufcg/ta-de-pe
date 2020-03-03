import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import {
  switchMap,
  map,
  tap,
  debounceTime,
  distinctUntilChanged
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

    const tipo = filters.id_tipo;

    return novidade.filter(p => {
      let filtered;

      filtered =
        tipo ? p.id_tipo === tipo
          : true;

      return filtered;
    });
  }

}
