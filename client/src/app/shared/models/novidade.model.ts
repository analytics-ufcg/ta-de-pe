export interface TipoNovidade {
  id_tipo: number;
  texto_evento: string;
}

export interface Novidade {
  id_novidade: number;
  id_tipo: number;
  id_licitacao: number;
  data: Date;
  id_original: number;
  nome_municipio: string;
}
