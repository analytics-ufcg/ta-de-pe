module.exports = (sequelize, type) => {
    novidade = sequelize.define(
      "novidade",
      {
        id_novidade: {
            type: type.INTEGER,
            primaryKey: true
        },
        
        id_tipo: type.INTEGER,
        id_licitacao: type.INTEGER,
        data: type.DATE,
        id_original: type.INTEGER,
        nome_municipio: type.STRING

      },
      {
        freezeTableName: true,
        timestamps: false
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