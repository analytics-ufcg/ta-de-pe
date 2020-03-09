module.exports = (sequelize, type) => {
  licitacao = sequelize.define(
    "licitacao",
    {
      id_licitacao: {
        type: type.INTEGER,
        primaryKey: true
      },
      id_estado: type.STRING,
      nm_orgao: type.STRING,
      nr_licitacao: type.INTEGER,
      ano_licitacao: type.INTEGER,
      cd_tipo_modalidade: type.STRING,
      permite_subcontratacao: type.STRING,
      tp_fornecimento: type.STRING,
      descricao_objeto: type.STRING,
      vl_estimado_licitacao: type.DECIMAL(15, 2),
      data_abertura: type.DATE,
      data_homologacao: type.DATE,
      vl_homologado: type.DECIMAL(15, 2),
      tp_licitacao: type.STRING,
      tipo_licitacao: type.STRING
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  licitacao.associate = function(models) {
    licitacao.belongsTo(models.orgao, {
      foreignKey: "id_orgao",
      sourceKey: "id_orgao",
      as: "licitacoesOrgao"
    });
    licitacao.belongsTo(models.novidade, {
      foreignKey: "id_licitacao",
      sourceKey: "id_licitacao",
      as: "licitacaoNovidade"
    });
    licitacao.belongsTo(models.itensLicitacao, {
      foreignKey: "id_licitacao",
      sourceKey: "id_licitacao",
      as: "licitacaoItensLicitacao"
    });
    licitacao.belongsTo(models.contrato, {
      foreignKey: "id_licitacao",
      sourceKey: "id_licitacao",
      as: "constratosLicitacao"
    });
  };
  return licitacao;
};
