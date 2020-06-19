module.exports = (sequelize, type) => {
  novidade = sequelize.define(
    "novidade",
    {
      id_novidade: {
        type: type.INTEGER,
        primaryKey: true
      },
      id_tipo: type.INTEGER,
      id_licitacao: type.INTEGER,
      data: type.DATE,
      id_original: type.INTEGER,
      nome_municipio: type.STRING,
      texto_novidade: type.STRING,
      id_contrato: type.STRING,
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  novidade.associate = function(models) {
    novidade.belongsTo(models.tipoNovidade, {
      foreignKey: "id_tipo",
      sourceKey: "id_tipo",
      as: "tipo"
    });
    novidade.belongsTo(models.licitacao, {
      foreignKey: "id_licitacao",
      sourceKey: "id_licitacao",
      as: "licitacaoNovidade"
    });
    novidade.belongsTo(models.contrato, {
      foreignKey: "id_contrato",
      sourceKey: "id_contrato",
      as: "contratoNovidade"
    });
  };

  return novidade;
};
