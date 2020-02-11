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
        freezeTableName: true
      }
    );

    tipoNovidade.associate = function(models) {
        novidade.belongsTo(models.tipoNovidade, {
            foreignKey: "id_tipo",
            sourceKey: "id_tipo",
            as: "NovidadeTipoNovidade"
        })
    };
    
    return tipoNovidade;
}