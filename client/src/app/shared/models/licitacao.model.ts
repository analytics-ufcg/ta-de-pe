import { ItensLicitacao } from './itensLicitacao.model';
import { Novidade } from './novidade.model';

export interface Licitacao {
  id_licitacao: number;
  nm_orgao: string;
  nr_licitacao: string;
  ano_licitacao: number;
  cd_tipo_modalidade: string;
  tp_licitacao: string;
  tipo_licitacao: string;
  data_abertura: Date;
  data_homologacao: Date;
  data_adjudicacao: Date;
  vl_homologado: number;
  descricao_objeto: string;
  itensLicitacao: ItensLicitacao[];
  licitacaoNovidade: Novidade[];
}
