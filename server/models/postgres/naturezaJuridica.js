module.exports = (sequelize, type) => {
  naturezaJuridica = sequelize.define(
    "natureza_juridica",
    {
      codigo_natureza_juridica: {
        type: type.STRING,
        primaryKey: true
      },
      nome_subclasse_natureza_juridica: type.STRING,
      codigo_classe_natureza_juridica: type.STRING,
      nome_classe_natureza_juridica: type.STRING
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  naturezaJuridica.associate = function (models) {
    naturezaJuridica.hasMany(models.dadosCadastrais, {
      foreignKey: "codigo_natureza_juridica",
      sourceKey: "codigo_natureza_juridica",
      as: "naturezaDadosCadastrais"
    });
  };
  return naturezaJuridica;
};
