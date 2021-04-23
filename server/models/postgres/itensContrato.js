module.exports = (sequelize, type) => {
  itensContrato = sequelize.define(
    "item_contrato",
    {
      id_item_contrato: {
        type: type.STRING,
        primaryKey: true
      },
      id_contrato: type.STRING,
      id_orgao: type.INTEGER,
      id_licitacao: type.STRING,
      id_item_licitacao: type.STRING,
      nr_lote: type.INTEGER,
      nr_licitacao: type.INTEGER,
      ano_licitacao: type.INTEGER,
      cd_tipo_modalidade: type.STRING,
      nr_contrato: type.INTEGER,
      ano_contrato: type.STRING,
      dt_inicio_vigencia: type.STRING,
      tp_instrumento_contrato: type.STRING,
      id_estado: type.STRING,
      sigla_estado: type.STRING,
      nr_item: type.STRING,
      qt_itens_contrato: type.REAL,
      vl_item_contrato: type.DECIMAL(15, 2),
      vl_total_item_contrato: type.DECIMAL(15, 2),
      ds_item: type.STRING,
      categoria: type.INTEGER,
      sg_unidade_medida: type.STRING,
      servico: type.BOOLEAN
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  itensContrato.associate = function (models) {
    itensContrato.belongsTo(models.contrato, {
      foreignKey: "id_contrato",
      sourceKey: "id_contrato",
      as: "itensContratoContrato"
    });
    itensContrato.belongsTo(models.orgao, {
      foreignKey: "id_orgao",
      sourceKey: "id_orgao",
      as: "itensContratoOrgao"
    });
    itensContrato.belongsTo(models.licitacao, {
      foreignKey: "id_licitacao",
      sourceKey: "id_licitacao",
      as: "itensContratoLicitacao"
    });
    itensContrato.belongsTo(models.itensLicitacao, {
      foreignKey: "id_item_licitacao",
      sourceKey: "id_item",
      as: "itensLicitacaoItensContrato"
    });
    itensContrato.hasMany(itensContrato, {
      foreignKey: "categoria",
      sourceKey: "categoria",
      as: 'itensSemelhantes'
    });
    itensContrato.hasOne(models.itemAtipico, {
      foreignKey: "id_item_contrato",
      sourceKey: "id_item_contrato",
      as: "alertaAtipico"
    });
  };
  return itensContrato;
}
