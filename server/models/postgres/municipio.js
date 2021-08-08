module.exports = (sequelize, type) => {
  municipio = sequelize.define(
    "municipio",
    {
      cd_municipio_ibge: {
        type: type.INTEGER,
        primaryKey: true
      },
      nome_municipio: type.STRING,
      id_estado: type.INTEGER,
      sigla_estado: type.STRING,
      slug_municipio: type.STRING
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  municipio.associate = function (models) {
    municipio.belongsTo(models.orgao, {
      foreignKey: "cd_municipio_ibge",
      sourceKey: "cd_municipio_ibge",
      as: "municipioOrgao"
    });
  };

  return municipio;
};
