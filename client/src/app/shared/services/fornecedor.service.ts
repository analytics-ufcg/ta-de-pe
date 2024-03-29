import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Fornecedor } from './../models/fornecedor.model';
import { ContratoFornecedor } from './../models/contratoFornecedor.model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  private url = environment.apiUrl + 'fornecedores';
  private urlContratos = environment.apiUrl + 'contratos';

  constructor(private http: HttpClient) { }

  get(id: string): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(this.url + '/' + id);
  }

  getFornecedores(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.url);
  }

  getContratos(nrDocumento: string): Observable<ContratoFornecedor[]> {
    return this.http.get<ContratoFornecedor[]>(this.urlContratos + '/fornecedor/' + nrDocumento);
  }

  buscar(termo: string): Observable<Fornecedor[]> {
    const parsedTermo = termo.replace(/[-.\/]/g, '');
    const params = new HttpParams().set('termo', parsedTermo);
    return this.http.get<Fornecedor[]>(this.url + '/search', { params });
  }

}
