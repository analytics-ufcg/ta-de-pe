import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import {
  switchMap,
  map,
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

  private TIPOS_LICITACAO = [1, 2, 3];
  private TIPOS_EMPENHO = [4, 5, 6, 7, 8, 9];
  private TIPOS_CONTRATO = [10, 11];

  constructor(private http: HttpClient) {
    this.novidades
      .pipe(
        switchMap(novidade =>
          this.searchfilters.pipe(
            distinctUntilChanged(
              (p: any, q: any) => {
                return this.compareFilter(p, q);
              }
            ),
            map(filters => this.filter(novidade, filters))
          )
        )
      )
      .subscribe(res => {
        this.novidadesFiltered.next(res);
      });
  }

  getNovidadesPorMunicipio(municipio: string, datas: any): Observable<Novidade[]> {
    const params = new HttpParams()
      .set('nome_municipio', municipio)
      .set('data_inicial', datas.dataInicial)
      .set('data_final', datas.dataFinal);

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

    return novidade.filter(n => {
      let filtered;
      filtered = licitacao ? this.isLicitacao(n.id_tipo) : filtered;
      filtered = empenho ? this.isEmpenho(n.id_tipo) || filtered : filtered;
      filtered = contrato ? this.isContrato(n.id_tipo) || filtered : filtered;
      return filtered;
    });
  }

  isLicitacao(idTipo: number): boolean {
    return this.TIPOS_LICITACAO.includes(idTipo);
  }

  isEmpenho(idTipo: number): boolean {
    return this.TIPOS_EMPENHO.includes(idTipo);
  }

  isContrato(idTipo: number): boolean {
    return this.TIPOS_CONTRATO.includes(idTipo);
  }

  /**
   * Compara se dois filtros são iguais ou não
   *
   * @param p Filtro para comparação
   * @param q Filtro para comparação
   */
  private compareFilter(p: any, q: any) {
    return p.licitacao === q.licitacao &&
      p.empenho === q.empenho &&
      p.contrato === q.contrato;
  }

}
