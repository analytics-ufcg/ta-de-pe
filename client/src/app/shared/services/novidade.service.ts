import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Novidade } from './../models/novidade.model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NovidadeService {

  private url = environment.apiUrl + 'novidades';

  constructor(private http: HttpClient) { }

  getNovidades(): Observable<Novidade[]> {
    return this.http.get<Novidade[]>(this.url);
  }

}
