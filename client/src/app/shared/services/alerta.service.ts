import { TipoAlerta } from './../models/tipoAlerta.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Alerta } from '../models/alerta.model';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  private url = environment.apiUrl + 'alertas';

  private alertas = new BehaviorSubject<Array<Alerta>>([]);
  private alertasFiltered = new BehaviorSubject<Array<Alerta>>([]);

  private filtro = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {
    this.alertas
      .pipe(
        switchMap(alerta =>
          this.filtro.pipe(
            debounceTime(400),
            distinctUntilChanged(
              (p: any, q: any) => {
                return this.compareFilter(p, q);
              }
            ),
            map(filters => this.filter(alerta, filters))
          ))
      )
      .subscribe(res => {
        this.alertasFiltered.next(res);
      });
  }

  getAlertas(): Observable<Alerta[]> {
    this.http.get<Alerta[]>(this.url)
      .subscribe(alertas => {
        this.alertas.next(alertas);
      });

    return this.alertasFiltered.asObservable();
  }

  getTiposAlertas(): Observable<TipoAlerta[]> {
    return this.http.get<TipoAlerta[]>(this.url + '/tipos');
  }

  private filter(alerta: Alerta[], filtro: any) {
    const pesquisa = filtro.nomePesquisado;
    const filtrosAlerta = filtro.tiposAlertas;

    return alerta.filter(a => {
      let filtered = true;

      let pesquisaNome = a.alertaFornecedor.nm_pessoa + a.alertaFornecedor.nr_documento;

      if (a.alertaContrato !== null) {
        pesquisaNome = pesquisaNome + a.alertaContrato.contratosOrgao.nome_municipio;
      }

      pesquisaNome = this.processaNome(pesquisaNome);

      filtered = pesquisa && filtered
          ? pesquisaNome.includes(this.processaNome(pesquisa))
          : filtered;
      filtered = filtrosAlerta && filtered ? this.isTipoAlertaFiltrado(a.id_tipo, filtrosAlerta) : filtered;
      return filtered;
    });
  }

  // Verifica se filtro foi alterado
  private compareFilter(p: any, q: any) {
    return p.nomePesquisado === q.nomePesquisado &&
    p.tiposAlertas === q.tiposAlertas;
  }

  // Processa string passada removendo acentuação, pontuação e deixando tudo minúsculo.
  private processaNome(nome) {
    return nome.normalize('NFD').replace(/\.|\/|\-/g, '').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  isTipoAlertaFiltrado(idAlerta: number, idSelecionados: number[]): boolean {
    return idSelecionados.includes(idAlerta);
  }

  diffAberturaEmpresaContrato(inicio, fim) {
    const ONE_DAY = 1000 * 60 * 60 * 24;

    const inicioEmpresa = Date.parse(inicio);
    const assinaturaContrato = Date.parse(fim);

    const differenceMs = Math.abs(assinaturaContrato - inicioEmpresa);

    return Math.round(differenceMs / ONE_DAY);
  }

  search(filtro) {
    this.filtro.next(filtro);
  }

}
