module.exports = (sequelize, type) => {
    itemAtipico = sequelize.define(
      "item_atipico",
      {
        id_item_atipico: {
          type: type.STRING,
          primaryKey: true
        },
        id_alerta: type.STRING,
        id_item_contrato: type.STRING,
        id_contrato: type.STRING,
        ds_item: type.STRING,
        total_vendas_item: type.INTEGER,
        n_vendas_semelhantes: type.INTEGER,
        perc_vendas_semelhantes: type.REAL             
      },
      {
        freezeTableName: true,
        timestamps: false
      }
    );

    itemAtipico.associate = function (models) {
      itemAtipico.belongsTo(models.itensContrato, {
        foreignKey: "id_item_contrato",
        sourceKey: "id_item_contrato",
        as: "itemAtipicoItensContrato"
      });
    };

    return itemAtipico;
  };
  