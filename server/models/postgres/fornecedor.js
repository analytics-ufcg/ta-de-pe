module.exports = (sequelize, type) => {
  fornecedor = sequelize.define(
    "fornecedor",
    {
      nr_documento: {
        type: type.STRING,
        primaryKey: true
      },
      id_estado: {
        type: type.STRING
      },
      nm_pessoa: type.STRING,
      tp_pessoa: type.STRING,
      total_de_contratos: type.STRING,
      data_primeiro_contrato: type.DATE
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
    fornecedor.hasOne(models.dadosCadastrais, {
      foreignKey: "cnpj",
      targetKey: "nr_documento",
      as: "fornecedorDadosCadastrais"
    });
    fornecedor.hasMany(models.cnaeSecundario, {
      foreignKey: "cnpj",
      targetKey: "nr_documento",
      as: "fornecedorCnaesSecundarios"
    });
    fornecedor.hasMany(models.alerta, {
      foreignKey: "nr_documento",
      targetKey: "nr_documento",
      as: "fornecedorAlerta"
    });
  };
  return fornecedor;
}
