import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { debounceTime, switchMap, map } from 'rxjs/operators';

import { EstadoLista, DirecaoOrd } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
class ListaService {

  public busca$ = new Subject<void>();
  private pDadosProcessados$ = new BehaviorSubject<any[]>([]);

  public dados$ = new Observable<any[]>();

  public estado: EstadoLista = {
    termoBusca: '',
    colunaOrd: '',
    direcaoOrd: ''
  };

  constructor(public pipe: DecimalPipe) {
    this.busca$.pipe(
      debounceTime(10),
      switchMap(() => this._buscar())
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
    if (typeof v1 === 'number') {
      return v1 - v2;
    } else {
      v1 = !v1 ? '' : v1;
      v2 = !v2 ? '' : v2;
      return v1.toString().localeCompare(v2.toString(), 'pt', {numeric: true, ignorePunctuation: true});
    }
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

  _buscar(): Observable<any[]> {
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
    const nuContratoCompleto = dados.nr_contrato + '/' + new Date(dados.dt_inicio_vigencia).getFullYear();
    dados.nm_fornecedor = dados.nm_fornecedor ? dados.nm_fornecedor : '';
    dados.nome_municipio = dados.nome_municipio ? dados.nome_municipio : '';
    dados.nr_documento_contratado = dados.nr_documento_contratado ? dados.nr_documento_contratado.toString() : '';
    return nuContratoCompleto.includes(termo)
        || dados.nm_fornecedor.toLowerCase().includes(termo)
        || dados.descricao_objeto_contrato.toLowerCase().includes(termo)
        || dados.nome_municipio.toLowerCase().includes(termo)
        || dados.nr_documento_contratado.includes(termo);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ListaLicitacoesService extends ListaService {

  constructor(pipe: DecimalPipe) {
    super(pipe);
  }

  corresponde(dados: any, texto: string, pipe: PipeTransform) {
    const termo = texto.toLowerCase();
    return pipe.transform(dados.nr_licitacao).includes(termo)
      || dados.descricao_objeto.toLowerCase().includes(termo)
      || dados.status.toLowerCase().includes(termo);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ListaItensService extends ListaService {

  constructor(pipe: DecimalPipe) {
    super(pipe);
  }

  corresponde(dados: any, texto: string, pipe: PipeTransform) {
    const termo = texto.toLowerCase();
    return dados.ds_item.toLowerCase().includes(termo)
        || dados.nome_municipio.toLowerCase().includes(termo)
        || dados.nr_contrato.includes(termo);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ListaContratosFornecedorService extends ListaService {

  constructor(pipe: DecimalPipe) {
    super(pipe);
  }

  corresponde(dados: any, texto: string, pipe: PipeTransform) {
    const termo = texto.toLowerCase();
    return dados.descricao_objeto_contrato.toLowerCase().includes(termo)
      || dados.nr_contrato.toLowerCase().includes(termo);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ListaMunicipiosService extends ListaService {

  constructor(pipe: DecimalPipe) {
    super(pipe);
  }

  corresponde(dados: any, texto: string, pipe: PipeTransform) {
    const termo = texto.toLowerCase();
    return dados.nome_municipio.toLowerCase().includes(termo)
        || dados.sigla_estado.includes(termo);
  }
}
