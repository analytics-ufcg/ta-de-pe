module.exports = (sequelize, type) => {
  orgao = sequelize.define(
    "orgao",
    {
      id_orgao: {
        type: type.INTEGER,
        primaryKey: true
      },
      nm_orgao: type.STRING,
      sigla_orgao: type.STRING,
      esfera: type.STRING,
      home_page: type.STRING,
      nome_municipio: type.STRING,
      cd_municipio_ibge: type.INTEGER,
      sigla_estado: type.STRING

    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  orgao.associate = function (models) {
    orgao.hasOne(models.municipio, {
      foreignKey: "cd_municipio_ibge",
      sourceKey: "cd_municipio_ibge",
      as: "municipioOrgao"
    });
    orgao.hasMany(models.licitacao, {
      foreignKey: "id_orgao",
      sourceKey: "id_orgao",
      as: "licitacoesOrgao"
    });
    orgao.hasMany(models.itensLicitacao, {
      foreignKey: "id_orgao",
      sourceKey: "id_orgao",
      as: "itensLicitacoesOrgao"
    });
    orgao.hasMany(models.contrato, {
      foreignKey: "id_orgao",
      sourceKey: "id_orgao",
      as: "contratosOrgao"
    });
    orgao.hasMany(models.itensContrato, {
      foreignKey: "id_orgao",
      sourceKey: "id_orgao",
      as: "itensContratoOrgao"
    });
    orgao.hasMany(models.documentoLicitacao, {
      foreignKey: "id_orgao",
      sourceKey: "id_orgao",
      as: "documentosLicitacaoOrgao"
    });
  };
  return orgao;
};
