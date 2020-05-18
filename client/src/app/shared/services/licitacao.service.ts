import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Licitacao } from '../models/licitacao.model';
import { ContratoLicitacao } from '../models/contratoLicitacao.model';
import { FornecedorLicitacao } from '../models/fornecedorLicitacao.model';
import { Novidade } from '../models/novidade.model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LicitacaoService {

  private url = environment.apiUrl + 'licitacoes';
  private urlContratos = environment.apiUrl + 'contratos';
  private urlNovidades = environment.apiUrl + 'novidades';

  constructor(private http: HttpClient) { }

  get(id: string): Observable<Licitacao> {
    return this.http.get<Licitacao>(this.url + '/' + id);
  }

  // Recupera contratos de uma licitação
  getContratos(id: string): Observable<ContratoLicitacao[]> {
    return this.http.get<ContratoLicitacao[]>(this.urlContratos + '/licitacao/' + id);
  }

  // Recupera fornecedores com contratos associados a uma licitação
  getFornecedores(id: string): Observable<FornecedorLicitacao[]> {
    return this.http.get<FornecedorLicitacao[]>(this.urlContratos + '/licitacao/' + id + '/fornecedores');
  }

  // Recupera novidades de uma licitação
  getNovidades(id: string): Observable<Novidade[]> {
    return this.http.get<Novidade[]>(this.urlNovidades + '/licitacao/' + id);
  }

  // Recupera licitacoes abertas (sem data de homologação)
  getAbertas(municipio: string): Observable<Licitacao[]> {
    const params = new HttpParams().set('nome_municipio', municipio);

    return this.http.get<Licitacao[]>(this.url + '/abertas', { params });
  }

}
