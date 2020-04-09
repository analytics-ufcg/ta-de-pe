import { ItensContrato } from './itensContrato.model';
import { Fornecedor } from './fornecedor.model';

export interface ContratoLicitacao {
  nr_contrato: number;
  nr_documento_contratatado: string;
  vl_contrato: number;
  contratoFornecedor: Fornecedor;
  itensContrato: ItensContrato[];
}
