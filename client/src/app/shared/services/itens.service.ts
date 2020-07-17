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

  getItensSimilares(termos: string[], dataInicioContrato: Date, unidadeMedida: string): Observable<ItensContrato[]> {
    return this.http.post<ItensContrato[]>(this.url + '/similares',
      { termo: termos, data: dataInicioContrato, unidade: unidadeMedida });
  }

  getMediaItensSemelhantes(termos: string[], dataInicioContrato: Date, unidadeMedida: string) {
    const strTermos = [termos[0], termos.slice(0, 2).join(' & '), termos.join(' & ')];
    return this.getItensSimilares(strTermos, dataInicioContrato, unidadeMedida)
      .pipe(take(1),
        map(itens => {
          const itensOrdenados = itens.slice(0, 21).sort((a, b) => a.vl_item_contrato - b.vl_item_contrato);
          if (itensOrdenados.length > 0) {
            const meioInf = Math.floor((itensOrdenados.length - 1) / 2);
            const meioSup = Math.ceil((itensOrdenados.length - 1) / 2);
            const mediana = (itensOrdenados[meioInf].vl_item_contrato + itensOrdenados[meioSup].vl_item_contrato) / 2;
            return { mediana, itensOrdenados };
          }
          //  retorna undefined caso não seja possível calcular a mediana
          return { mediana: undefined, itensOrdenados };
        })
      ).toPromise();
  }
}
