import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Alerta } from '../models/alerta.model';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  private url = environment.apiUrl + 'alertas';

  constructor(private http: HttpClient) {
  }

  getAlertas(): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(this.url);
  }

}
