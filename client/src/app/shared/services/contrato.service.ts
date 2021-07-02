import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ContratoLicitacao } from '../models/contratoLicitacao.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  private url = environment.apiUrl + 'contratos';

  constructor(private http: HttpClient) { }

  get(id: string): Observable<ContratoLicitacao> {
    return this.http.get<ContratoLicitacao>(this.url + '/' + id);
  }

  // Recupera contratos vigentes
  getVigentes(cdMunicipioIbge: number): Observable<ContratoLicitacao[]> {
    const params = new HttpParams().set('cd_municipio_ibge', '' + cdMunicipioIbge);
    return this.http.get<ContratoLicitacao[]>(this.url + '/vigentes', { params });
  }

  buscar(termo: string): Observable<ContratoLicitacao[]> {
    const params = new HttpParams().set('termo', termo);
    return this.http.get<ContratoLicitacao[]>(this.url + '/search', { params });
  }

}
