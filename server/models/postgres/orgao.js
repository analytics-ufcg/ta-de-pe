module.exports = (sequelize, type) => {
    orgao = sequelize.define(
        "orgao",
      {
        id_orgao: {
            type: type.INTEGER,
            primaryKey: true
        },
        id_estado: type.STRING,
        nm_orgao: type.STRING,
      },
      {
        timestamps: false
      }

    );

    orgao.associate = function(models) {
        orgao.belongTo(models.licitacao, {
            foreignKey: "id_orgao",
            sourceKey: "id_orgao",
            as: "licitacoesOrgao"

        });
    }
    return orgao;
}