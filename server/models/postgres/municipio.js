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
      sigla_estado: type.STRING
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  return municipio;
};
