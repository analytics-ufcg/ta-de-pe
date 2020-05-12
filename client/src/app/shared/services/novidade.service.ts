import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { Observable, BehaviorSubject } from 'rxjs';
import { sprintf } from 'sprintf-js';

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

  private TIPOS_FASE_CONTRATACAO = this.TIPOS_LICITACAO.concat(this.TIPOS_CONTRATO);
  private TIPOS_FASE_PAGAMENTO = this.TIPOS_EMPENHO;

  constructor(
    private http: HttpClient,
    private currencyPipe: CurrencyPipe) {
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

    const contratacao = filters.contratacao;
    const pagamento = filters.pagamento;

    return novidade.filter(n => {
      let filtered;
      filtered = contratacao ? this.isFaseContratacao(n.id_tipo) : filtered;
      filtered = pagamento ? this.isFasePagamento(n.id_tipo) || filtered : filtered;
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

  isFaseContratacao(idTipo: number): boolean {
    return this.TIPOS_FASE_CONTRATACAO.includes(idTipo);
  }

  isFasePagamento(idTipo: number): boolean {
    return this.TIPOS_FASE_PAGAMENTO.includes(idTipo);
  }

  getTextoNovidade(novidade: Novidade): string {
    if (this.isLicitacao(novidade.id_tipo)) {
      return sprintf(novidade.tipo.texto_evento,
        novidade.licitacaoNovidade.nr_licitacao + '/' + novidade.licitacaoNovidade.ano_licitacao);
    } else if (this.isEmpenho(novidade.id_tipo)) {
      return sprintf(novidade.tipo.texto_evento,
        this.currencyPipe.transform(novidade.texto_novidade, 'R$'),
        novidade.licitacaoNovidade.nr_licitacao + '/' + novidade.licitacaoNovidade.ano_licitacao);
    } else if (this.isContrato(novidade.id_tipo)) {
      return sprintf(novidade.tipo.texto_evento,
        novidade.texto_novidade,
        novidade.licitacaoNovidade.nr_licitacao + '/' + novidade.licitacaoNovidade.ano_licitacao);
    }
    return novidade.tipo.texto_evento;
  }

  getTextoResumo(novidade: Novidade, total: number): string {
    if (this.isEmpenho(novidade.id_tipo)) {
      return sprintf(novidade.tipo.texto_resumo, this.currencyPipe.transform(total, 'R$'));
    } else if (this.isContrato(novidade.id_tipo)) {
      return sprintf(novidade.tipo.texto_resumo, novidade.texto_novidade);
    }
    return novidade.tipo.texto_resumo;
  }

  /**
   * Compara se dois filtros são iguais ou não
   *
   * @param p Filtro para comparação
   * @param q Filtro para comparação
   */
  private compareFilter(p: any, q: any) {
    return p.contratacao === q.contratacao &&
      p.pagamento === q.pagamento;
  }

}
