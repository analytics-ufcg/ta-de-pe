import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Licitacao } from '../models/licitacao.model';
import { ContratoLicitacao } from '../models/contratoLicitacao.model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LicitacaoService {

  private url = environment.apiUrl + 'licitacoes';
  private urlContratos = environment.apiUrl + 'contratos';

  constructor(private http: HttpClient) { }

  get(id: string): Observable<Licitacao> {
    return this.http.get<Licitacao>(this.url + '/' + id);
  }

  // Recupera contratos de uma licitação
  getContratos(id: string): Observable<ContratoLicitacao[]> {
    return this.http.get<ContratoLicitacao[]>(this.urlContratos + '/licitacao/' + id);
  }

}
