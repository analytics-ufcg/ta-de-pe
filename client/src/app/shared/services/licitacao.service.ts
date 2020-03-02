import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Licitacao } from '../models/licitacao.model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LicitacaoService {

  private url = environment.apiUrl + 'licitacoes';

  constructor(private http: HttpClient) { }

  get(id: string): Observable<Licitacao> {
    return this.http.get<Licitacao>(this.url + '/' + id);
  }

}
