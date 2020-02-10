import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Municipio } from './municipio.model'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class BuscaMunicipioService {

    private url = "http://localhost:5000/api/orgaos/";

    constructor(private http: HttpClient) { }

    getMunicipios(): Observable<Municipio[]> {
        return this.http.get<Municipio[]>(this.url);
    }

}