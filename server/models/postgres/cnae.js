module.exports = (sequelize, type) => {
  cnae = sequelize.define(
    "cnae",
    {
      id_cnae: {
        type: type.STRING,
        primaryKey: true
      },
      cod_secao: type.STRING,
      nm_secao: type.STRING,
      cod_divisao: type.STRING,
      nm_divisao: type.STRING,
      cod_grupo: type.STRING,
      nm_grupo: type.STRING,
      cod_classe: type.STRING,
      nm_classe: type.STRING,
      nm_cnae: type.STRING
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  cnae.associate = function (models) {
    cnae.hasMany(models.cnaeSecundario, {
      foreignKey: "id_cnae",
      sourceKey: "id_cnae",
      as: "cnaeCnaeSecundario"
    });
    cnae.hasMany(models.dadosCadastrais, {
      foreignKey: "cnae_fiscal",
      sourceKey: "id_cnae",
      as: "cnaeDadosCadastrais"
    });
  };
  return cnae;
};
