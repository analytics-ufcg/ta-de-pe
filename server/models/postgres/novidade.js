module.exports = (sequelize, type) => {
    novidade = sequelize.define(
      "novidade",
      {
        id_novidade: {
            type: type.STRING,
            primaryKey: true
        },
        
        id_tipo: type.INTEGER,
        id_licitacao: type.INTEGER,
        data: type.DATE,
        id_original: type.INTEGER,
        nm_municipio: type.STRING

      },
      {
        freezeTableName: true
      }
    );

    novidade.associate = function(models) {
        novidade.hasOne(models.tipoNovidade, {
            foreignKey: "id_tipo",
            sourceKey: "id_tipo",
            as: "NovidadeTipoNovidade"
        })
    };
    
    return novidade;
}