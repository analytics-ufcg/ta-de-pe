import { ItensContrato } from './itensContrato.model';
import { Fornecedor } from './fornecedor.model';

export interface ContratoLicitacao {
  valor_contratado: number;
  valor_estimado: number;
  nr_contrato: number;
  nr_documento_contratatado: string;
  vl_contrato: number;
  dt_inicio_vigencia: Date;
  dt_final_vigencia: Date;
  contratoFornecedor: Fornecedor;
  itensContrato: ItensContrato[];
  ano_contrato: number;
  id_contrato: string;
  total_pago: number;
  contratosLicitacao: any;
}
