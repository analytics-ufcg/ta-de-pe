module.exports = (sequelize, type) => {
    alerta = sequelize.define(
      "alerta",
      {
        id_alerta: {
          type: type.STRING,
          primaryKey: true
        },
        nr_documento: type.STRING,
        id_contrato: type.STRING,
        id_tipo: type.INTEGER,
        info_contrarto: type.STRING
      },
      {
        freezeTableName: true,
        timestamps: false
      }
    );
  
    alerta.associate = function(models) {
      alerta.belongsTo(models.tipoAlerta, {
        foreignKey: "id_tipo",
        sourceKey: "id_tipo",
        as: "AlertaTipo"
      });
      alerta.belongsTo(models.contrato, {
        foreignKey: "id_contrato",
        sourceKey: "id_contrato",
        as: "alertaContrato"
      });
      alerta.belongsTo(models.fornecedor, {
        foreignKey: "nr_documento",
        sourceKey: "nr_documento",
        as: "alertaFornecedor"
      });
    };
  
    return alerta;
  };
  