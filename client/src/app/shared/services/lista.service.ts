import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { BehaviorSubject, Subject, Observable, of, combineLatest } from 'rxjs';
import { tap, debounceTime, switchMap, delay, map } from 'rxjs/operators';

import { EstadoLista, DirecaoOrd, ResultadoBusca } from '../models/lista.model';
import { SubjectSubscriber } from 'rxjs/internal/Subject';

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
      debounceTime(200),
      switchMap(() => this._buscar()),
      delay(200),
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
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  private ordenar(dados: any[], coluna: string, direcao: string): any[] {
    if (direcao === '') {
      return dados;
    } else {
      return [...dados].sort((a, b) => {
        const res = this.comparar(a[coluna], b[coluna]);
        return direcao === 'asc' ? res : -res;
      });
    }
  }

  private corresponde(dados: any, texto: string, pipe: PipeTransform) {
    const termo = texto.toLowerCase();
    return pipe.transform(dados.nr_contrato).includes(termo)
        || dados.contratoFornecedor.nm_pessoa.toLowerCase().includes(termo)
        || pipe.transform(dados.nr_documento_contratado).includes(termo);
  }

  private _buscar(): Observable<any> {
    const {colunaOrd, direcaoOrd, termoBusca} = this._estado;
    return this.dados$.pipe(map(dados => dados.filter(d => this.corresponde(d, termoBusca, this.pipe))));
    // // 1. sort
    // let dados = this.ordenar(this._dados, colunaOrd, direcaoOrd);

    // // 2. filter
    // dados = dados.filter(country => this.corresponde(dados, termoBusca, this.pipe));
  }
}
