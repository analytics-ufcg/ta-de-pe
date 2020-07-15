module.exports = (sequelize, type) => {
  documentoLicitacao = sequelize.define(
    "documento_licitacao",
    {
      id_documento_licitacao: {
        type: type.STRING,
        primaryKey: true
      },
      id_licitacao: type.STRING,
      id_orgao: type.INTEGER,
      nr_licitacao: type.STRING,
      ano_licitacao: type.INTEGER,
      cd_tipo_modalidade: type.STRING,
      cd_tipo_documento: type.STRING,
      nome_arquivo_documento: type.STRING,
      cd_tipo_fase: type.STRING,
      id_evento_licitacao: type.STRING,
      tp_documento: type.STRING,
      nr_documento: type.DATE,
      arquivo_timestamp: type.STRING,
      arquivo_url_download: type.STRING,
      descricao_tipo_documento: type.STRING
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  documentoLicitacao.associate = function (models) {
    documentoLicitacao.belongsTo(models.orgao, {
      foreignKey: "id_orgao",
      sourceKey: "id_orgao",
      as: "documentosLicitacaoOrgao"
    });
    documentoLicitacao.belongsTo(models.licitacao, {
      foreignKey: "id_licitacao",
      sourceKey: "id_licitacao",
      as: "docsLicitacao"
    });
  };
  return documentoLicitacao;
};
