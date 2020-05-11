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

    getItensSimilares(nomeItem: string[]): Observable<ItensContrato[]> {
        return this.http.post<ItensContrato[]>(this.url + '/similares', { termo: nomeItem });
    }

}
