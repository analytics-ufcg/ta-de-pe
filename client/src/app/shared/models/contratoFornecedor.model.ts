

export interface ContratoFornecedor {
  id_contrato: string
  id_licitacao: number
  id_orgao: number
  nr_contrato: number
  ano_contrato: number
  nr_licitacao: number
  ano_licitacao: number
  cd_tipo_modalidade: number
  tp_instrumento_contrato: number
  dt_inicio_vigencia: Date
  dt_final_vigencia: Date
  vl_contrato: number
  descricao_objeto_contrato: string
  nome_municipio: string
}
