import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { tap, debounceTime, switchMap, delay, map } from 'rxjs/operators';

import { EstadoLista, DirecaoOrd } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  private _busca$ = new Subject<void>();
  private _dadosProcessados$ = new BehaviorSubject<any[]>([]);

  public dados$: Observable<any[]>;
  public loading$ = new BehaviorSubject<boolean>(true);

  private _estado: EstadoLista = {
    termoBusca: '',
    colunaOrd: '',
    direcaoOrd: ''
  };

  constructor(private pipe: DecimalPipe) {
    this._busca$.pipe(
      tap(() => this.loading$.next(true)),
      debounceTime(0),
      switchMap(() => this._buscar()),
      delay(0),
      tap(() => this.loading$.next(false))
    ).subscribe(dados => {
      this._dadosProcessados$.next(dados);
    });

    this._busca$.next();
  }

  get dadosProcessados$() { return this._dadosProcessados$.asObservable(); }
  get termoBusca() { return this._estado.termoBusca; }

  set termoBusca(termoBusca: string) { this._set({termoBusca}); }
  set colunaOrd(colunaOrd: string) { this._set({colunaOrd}); }
  set direcaoOrd(direcaoOrd: DirecaoOrd) { this._set({direcaoOrd}); }

  private _set(patch: Partial<EstadoLista>) {
    Object.assign(this._estado, patch);
    this._busca$.next();
  }

  private comparar(v1, v2) {
    v1 = !v1 ? '' : v1;
    v2 = !v2 ? '' : v2;
    return v1.toString().localeCompare(v2.toString(), 'pt', {numeric: true, ignorePunctuation: true});
  }

  private ordenar(dados: any[], coluna: string, direcao: string): any[] {
    if (direcao === '') {
      return dados;
    } else {
      const dadosOrdenados = dados.sort((a, b) => this.comparar(a[coluna], b[coluna]));
      return direcao === 'asc' ? dadosOrdenados : dadosOrdenados.reverse();
    }
  }

  private corresponde(dados: any, texto: string, pipe: PipeTransform) {
    const termo = texto.toLowerCase();
    dados.nm_fornecedor = dados.nm_fornecedor ? dados.nm_fornecedor : '';
    return pipe.transform(dados.nr_contrato).includes(termo)
        || dados.nm_fornecedor.toLowerCase().includes(termo)
        || pipe.transform(dados.nr_documento_contratado).includes(termo);
  }

  private _buscar(): Observable<any[]> {
    const {colunaOrd, direcaoOrd, termoBusca} = this._estado;
    return this.dados$
      .pipe(
        map(dados => this.ordenar(dados, colunaOrd, direcaoOrd)),
        map(dados => dados.filter(d => this.corresponde(d, termoBusca, this.pipe)))
      );
  }
}
