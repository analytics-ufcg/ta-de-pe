import { ContratoLicitacao } from './contratoLicitacao.model';
import { DocumentoLicitacao } from './documentoLicitacao.model';

export interface Licitacao {
  id_licitacao: number;
  status: string;
  nm_orgao: string;
  nr_licitacao: string;
  ano_licitacao: number;
  cd_tipo_modalidade: string;
  tp_licitacao: string;
  tipo_licitacao: string;
  tipo_modalidade_licitacao: string;
  data_abertura: Date;
  data_homologacao: Date;
  data_adjudicacao: Date;
  vl_homologado: number;
  qt_contratos: number;
  vl_contratado: number;
  descricao_objeto: string;
  assunto: string;
  sigla_estado: string;
  contratosLicitacao: ContratoLicitacao[];
  docsLicitacao: DocumentoLicitacao[];
}
