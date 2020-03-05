export interface Licitacao {
  id_licitacao: number;
  nm_orgao: string;
  nr_licitacao: string;
  ano_licitacao: number;
  cd_tipo_modalidade: string;
  tp_licitacao: string;
  tipo_licitacao: string;
  data_abertura: Date;
  vl_homologado: number;
}
