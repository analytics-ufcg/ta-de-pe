import { ItensContrato } from './itensContrato.model';
import { Fornecedor } from './fornecedor.model';

export interface ContratoLicitacao {
  nm_orgao: string;
  nm_fornecedor: string;
  tp_fornecedor: string;
  id_licitacao: number;
  nr_licitacao: number;
  ano_licitacao: number;
  valor_contratado: number;
  valor_estimado: number;
  nr_contrato: number;
  nr_documento_contratado: string;
  vl_contrato: number;
  dt_inicio_vigencia: Date;
  dt_final_vigencia: Date;
  itensContrato: ItensContrato[];
  contratoFornecedor: any;
  ano_contrato: number;
  id_contrato: string;
  total_pago: number;
  dias_vigente: number;
  contratosLicitacao: any;
  descricao_objeto_contrato: string;
  tipo_instrumento_contrato: string;
  resumido: boolean;
}
