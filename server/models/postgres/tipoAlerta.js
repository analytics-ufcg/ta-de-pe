
module.exports = (sequelize, type) => {
    tipoAlerta = sequelize.define(
      "tipo_alerta",
      {
        id_tipo: {
          type: type.INTEGER,
          primaryKey: true
        },
        titulo: type.STRING,
        descricao: type.STRING
      },
      {
        freezeTableName: true,
        timestamps: false
      }
    );
  
    tipoAlerta.associate = function(models) {
      tipoAlerta.hasMany(models.alerta, {
        foreignKey: "id_tipo",
        targetKey: "id_tipo",
        as: "tipoAlertaAlerta"
      });
    };
  
    return tipoAlerta;
  };
  