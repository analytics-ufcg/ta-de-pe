export interface ItensContrato {
  id_item_contrato: string;
  nr_contrato: string;
  ano_contrato: number;
  ano_licitacao: any;
  itensSemelhantes: any[];
  mediana_valor: number;
  media_total: number;
  percentual_vs_estado: number;
  percentual_vs_estimado: number;
  itensLicitacaoItensContrato: any;
  qt_itens_contrato: number;
  vl_item_contrato: number;
  vl_total_item_contrato: number;
  vl_unitario_estimado: number;
  sg_unidade_medida: string;
  ds_item: string;
  ds_item_resumido: string;
  dt_inicio_vigencia: Date;
  nome_municipio: string;
  itensContratoOrgao: any;
  alertaAtipico: any;
  resumido: boolean;
  servico: boolean;
}
