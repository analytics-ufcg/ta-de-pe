import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Alerta } from '../models/alerta.model';
import { TipoAlerta } from './../models/tipoAlerta.model';
import { Estado } from './../models/estado.model';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  private url = environment.apiUrl + 'alertas';

  private alertas = new BehaviorSubject<Array<Alerta>>([]);
  private alertasFiltered = new BehaviorSubject<Array<Alerta>>([]);

  private filtro = new BehaviorSubject<any>({});

  readonly ESTADO_PADRAO = '0';

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

  getListaEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(this.url + '/estados');
  }

  private filter(alerta: Alerta[], filtro: any) {
    const pesquisa = filtro.nomePesquisado;
    const filtrosAlerta = filtro.tiposAlertas;
    const estado = filtro.estado;

    return alerta.filter(a => {
      let filtered = true;

      let pesquisaNome = a.alertaFornecedor.nm_pessoa + a.alertaFornecedor.nr_documento;

      if (a.alertaContrato !== null && a.alertaContrato.contratosOrgao !== null) {
        pesquisaNome = pesquisaNome + a.alertaContrato.contratosOrgao.nome_municipio;
      }

      pesquisaNome = this.processaNome(pesquisaNome);

      filtered = pesquisa && filtered
        ? pesquisaNome.includes(this.processaNome(pesquisa))
        : filtered;
      filtered = filtrosAlerta && filtered ? this.isTipoAlertaFiltrado(a.id_tipo, filtrosAlerta) : filtered;

      filtered = estado && estado !== this.ESTADO_PADRAO && filtered ?
        this.isEstadoSelecionado(a, estado) : filtered;

      return filtered;
    });
  }

  // Verifica se filtro foi alterado
  private compareFilter(p: any, q: any) {
    return p.nomePesquisado === q.nomePesquisado &&
      p.tiposAlertas === q.tiposAlertas &&
      p.estado === q.estado;
  }

  // Processa string passada removendo acentuação, pontuação e deixando tudo minúsculo.
  private processaNome(nome) {
    return nome.normalize('NFD').replace(/\.|\/|\-/g, '').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  isTipoAlertaFiltrado(idAlerta: number, idSelecionados: number[]): boolean {
    return idSelecionados.includes(idAlerta);
  }

  isEstadoSelecionado(a, estado) {
    if (a.alertaContrato !== null) {
      return Number(estado) === a.alertaContrato.id_estado;
    } else if (a.alertaFornecedor !== null) {
      return Number(estado) === a.alertaFornecedor.id_estado;
    }
    return false;
  }

  diffAberturaEmpresaContrato(inicio, fim) {
    const ONE_DAY = 1000 * 60 * 60 * 24;

    const inicioEmpresa = Date.parse(inicio);
    const assinaturaContrato = Date.parse(fim);

    const differenceMs = assinaturaContrato - inicioEmpresa;

    return Math.round(differenceMs / ONE_DAY);
  }

  search(filtro) {
    this.filtro.next(filtro);
  }

}
