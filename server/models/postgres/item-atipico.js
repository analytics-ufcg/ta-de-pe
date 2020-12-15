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
        ds_item: type.STRING          
      },
      {
        freezeTableName: true,
        timestamps: false
      }
    );
    return itemAtipico;
  };
  