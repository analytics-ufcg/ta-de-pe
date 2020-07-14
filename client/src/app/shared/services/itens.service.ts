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

    get(idItem: string): Observable<ItensContrato> {
      return this.http.get<ItensContrato>(`${this.url}/item/${idItem}`);
    }

    getByContrato(idContrato: string): Observable<ItensContrato[]> {
      return this.http.get<ItensContrato[]>(`${this.url}/contrato/${idContrato}`);
    }

    getItensSimilares(termos: string[], dataInicioContrato: Date): Observable<ItensContrato[]> {
        return this.http.post<ItensContrato[]>(this.url + '/similares', { termo: termos, data: dataInicioContrato });
    }

    getMediaItensSemelhantes(termos: string[], dataInicioContrato: Date) {
      const strTermos = [termos[0], termos.slice(0, 2).join(' & '), termos.join(' & ')];
      return this.getItensSimilares(strTermos, dataInicioContrato)
        .pipe(take(1),
          map(itens => {
            const itensOrdenados = itens.slice(0, 21).sort((a, b) => a.vl_item_contrato - b.vl_item_contrato);
            const meioInf = Math.floor((itensOrdenados.length - 1) / 2);
            const meioSup = Math.ceil((itensOrdenados.length - 1) / 2);
            const mediana = (itensOrdenados[meioInf].vl_item_contrato + itensOrdenados[meioSup].vl_item_contrato) / 2;
            return { mediana, itensOrdenados };
          })
        ).toPromise();
    }
}
