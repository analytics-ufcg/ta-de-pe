export type DirecaoOrd = 'asc' | 'desc' | '';

export interface EventoOrd {
  coluna: string;
  direcao: DirecaoOrd;
}

export interface EstadoLista {
  termoBusca: string;
  colunaOrd: string;
  direcaoOrd: DirecaoOrd;
}
