module.exports = (sequelize, type) => {
  tipoNovidade = sequelize.define(
    "tipo_novidade",
    {
      id_tipo: {
        type: type.INTEGER,
        primaryKey: true
      },

      texto_evento: type.STRING
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  tipoNovidade.associate = function(models) {
    tipoNovidade.hasMany(models.novidade, {
      foreignKey: "id_tipo",
      targetKey: "id_tipo",
      as: "tipo"
    });
  };

  return tipoNovidade;
};
