import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { tap, debounceTime, switchMap, delay, map } from 'rxjs/operators';

import { EstadoLista, DirecaoOrd } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
class ListaService {

  private busca$ = new Subject<void>();
  private pDadosProcessados$ = new BehaviorSubject<any[]>([]);

  public dados$: Observable<any[]>;
  public loading$ = new BehaviorSubject<boolean>(true);

  public estado: EstadoLista = {
    termoBusca: '',
    colunaOrd: '',
    direcaoOrd: ''
  };

  constructor(public pipe: DecimalPipe) {
    this.busca$.pipe(
      tap(() => this.loading$.next(true)),
      debounceTime(0),
      switchMap(() => this._buscar()),
      delay(0),
      tap(() => this.loading$.next(false))
    ).subscribe(dados => {
      this.pDadosProcessados$.next(dados);
    });

    this.busca$.next();
  }

  get dadosProcessados$() { return this.pDadosProcessados$.asObservable(); }
  get termoBusca() { return this.estado.termoBusca; }

  set termoBusca(termoBusca: string) { this._set({termoBusca}); }
  set colunaOrd(colunaOrd: string) { this._set({colunaOrd}); }
  set direcaoOrd(direcaoOrd: DirecaoOrd) { this._set({direcaoOrd}); }

  private _set(patch: Partial<EstadoLista>) {
    Object.assign(this.estado, patch);
    this.busca$.next();
  }

  comparar(v1, v2) {
    v1 = !v1 ? '' : v1;
    v2 = !v2 ? '' : v2;
    return v1.toString().localeCompare(v2.toString(), 'pt', {numeric: true, ignorePunctuation: true});
  }

  ordenar(dados: any[], coluna: string, direcao: string): any[] {
    if (direcao === '') {
      return dados;
    } else {
      const dadosOrdenados = dados.sort((a, b) => this.comparar(a[coluna], b[coluna]));
      return direcao === 'asc' ? dadosOrdenados : dadosOrdenados.reverse();
    }
  }

  corresponde(dados: any, texto: string, pipe: PipeTransform) {
  }

  private _buscar(): Observable<any[]> {
    const {colunaOrd, direcaoOrd, termoBusca} = this.estado;
    return this.dados$
      .pipe(
        map(dados => this.ordenar(dados, colunaOrd, direcaoOrd)),
        map(dados => dados.filter(d => this.corresponde(d, termoBusca, this.pipe)))
      );
  }
}

@Injectable({
  providedIn: 'root'
})
export class ListaContratosService extends ListaService {

  constructor(pipe: DecimalPipe) {
    super(pipe);
  }

  corresponde(dados: any, texto: string, pipe: PipeTransform) {
    const termo = texto.toLowerCase();
    dados.nm_fornecedor = dados.nm_fornecedor ? dados.nm_fornecedor : '';
    return pipe.transform(dados.nr_contrato).includes(termo)
        || dados.nm_fornecedor.toLowerCase().includes(termo)
        || pipe.transform(dados.nr_documento_contratado).includes(termo);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ListaItensService extends ListaService {

  constructor(pipe: DecimalPipe) {
    super(pipe);
  }
}
