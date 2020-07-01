import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ItensContrato } from '../models/itensContrato.model';
import { environment } from '../../../environments/environment';
import { take, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ItensService {

    private url = environment.apiUrl + 'itensContrato';

    constructor(private http: HttpClient) { }

    get(idItem: string): Observable<ItensContrato> {
      return this.http.get<ItensContrato>(`${this.url}/item/${idItem}`);
    }

    getItensSimilares(nomeItem: string[], dataInicioContrato: Date): Observable<ItensContrato[]> {
        return this.http.post<ItensContrato[]>(this.url + '/similares', { termo: nomeItem, data: dataInicioContrato });
    }
}
