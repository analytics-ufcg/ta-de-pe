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

  getItensSimilares(item: ItensContrato, termos: string[]): Observable<ItensContrato[]> {
      return this.http.post<ItensContrato[]>(this.url + '/similares',
        { termo: termos, data: item.dt_inicio_vigencia, unidade: item.sg_unidade_medida });
  }

  getMediaItensSemelhantes(item: ItensContrato, termos: string[]): Observable<ItensContrato> {
    return this.getItensSimilares(item, termos)
      .pipe(take(1),
        map(itens => {
          if (itens.length === 0) {
            return item;
          }
          const itensOrdenados = itens.sort((a, b) => a.vl_item_contrato - b.vl_item_contrato);
          const meioInf = Math.floor((itensOrdenados.length - 1) / 2);
          const meioSup = Math.ceil((itensOrdenados.length - 1) / 2);
          const mediana = (itensOrdenados[meioInf].vl_item_contrato + itensOrdenados[meioSup].vl_item_contrato) / 2;
          item.mediana_valor = mediana;
          item.itensSemelhantes = itensOrdenados;
          return item;
        })
      );
  }
}
