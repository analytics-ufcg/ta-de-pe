import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { take, map } from 'rxjs/operators';

import { ItensContrato } from '../models/itensContrato.model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItensService {

  private url = environment.apiUrl + 'itensContrato';

  constructor(private http: HttpClient) { }

  getItensSimilares(item: string, ano: number): Observable<ItensContrato[]> {
    return this.http.post<ItensContrato[]>(this.url + '/similares', {termo: item})
        .pipe(take(1), 
        map(item => {
        return item.filter(d => {
            return d.ano_licitacao === ano;
        }).reduce((sum, itemB) => {
            return sum + itemB.vl_item_contrato / item.filter(d => {
            return d.ano_licitacao === ano;
            }).length;
        }, 0);
        })
        ).toPromise();
  }

}
