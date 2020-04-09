module.exports = (sequelize, type) => {
  fornecedor = sequelize.define(
    "fornecedor",
    {
      nr_documento: {
        type: type.STRING,
        primaryKey: true
      },
      nm_pessoa: type.STRING,
      tp_pessoa: type.STRING
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  fornecedor.associate = function (models) {
    fornecedor.hasMany(models.contrato, {
      foreignKey: "nr_documento_contratado",
      targetKey: "nr_documento",
      as: "fornecedorContratos"
    });
  };
  return fornecedor;
}
