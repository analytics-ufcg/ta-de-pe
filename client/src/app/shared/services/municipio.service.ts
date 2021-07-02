import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Municipio } from '../models/municipio.model';

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MunicipioService {

    private url = environment.apiUrl + 'municipios';

    constructor(private http: HttpClient) { }

    getMunicipios(): Observable<Municipio[]> {
        return this.http.get<Municipio[]>(this.url);
    }

    buscar(termo: string): Observable<Municipio[]> {
      const params = new HttpParams().set('termo', termo);
      return this.http.get<Municipio[]>(this.url + '/busca', { params });
    }

}
