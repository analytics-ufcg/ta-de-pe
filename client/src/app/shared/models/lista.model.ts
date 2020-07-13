import { ContratoLicitacao } from "./contratoLicitacao.model";
import { Licitacao } from './licitacao.model';

export type DirecaoOrd = 'asc' | 'desc' | '';

export interface EventoOrd {
  coluna: string;
  direcao: DirecaoOrd;
}

export interface ResultadoBusca {
  dados: any[];
}

export interface EstadoLista {
  termoBusca: string;
  colunaOrd: string;
  direcaoOrd: DirecaoOrd;
}
