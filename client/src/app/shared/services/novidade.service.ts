import { Novidade } from './../models/novidade.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NovidadeService {

  private url = 'http://localhost:5000/api/novidades';

  constructor(private http: HttpClient) { }

  getNovidades(): Observable<Novidade[]> {
    return this.http.get<Novidade[]>(this.url);
  }

}
