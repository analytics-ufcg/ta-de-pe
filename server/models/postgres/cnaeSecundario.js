module.exports = (sequelize, type) => {
  cnaeSecundario = sequelize.define(
    "cnae_secundario",
    {
      id_cnae_secundario: {
        type: type.STRING,
        primaryKey: true
      },
      tipo_de_registro: type.STRING,
      indicador: type.STRING,
      cnpj: type.STRING,
      id_cnae: type.STRING,
      filler: type.STRING
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  cnaeSecundario.associate = function (models) {
    cnaeSecundario.belongsTo(models.cnae, {
      foreignKey: "id_cnae",
      sourceKey: "id_cnae",
      as: "cnaeSecundarioCnae"
    });
    cnaeSecundario.belongsTo(models.fornecedor, {
      foreignKey: "cnpj",
      sourceKey: "nr_documento",
      as: "cnaeSecundarioFornecedor"
    });
  };
  return cnaeSecundario;
};
