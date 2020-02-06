module.exports = (sequelize, type) => {
  orgao = sequelize.define(
      "orgao",
      {
          id_orgao: {
              type: type.INTEGER,
              primaryKey: true
          },
          nm_orgao: type.STRING,
          sigla_orgao: type.STRING,
          esfera: type.STRING,
          home_page: type.STRING,
          nome_municipio: type.STRING,
          cd_municipio_ibge: type.INTEGER

      }, 
      {
        freezeTableName: true
      }
  );

  orgao.associate = function(models) {
    orgao.hasMany(models.licitacao, {
        foreignKey: "id_orgao",
        sourceKey: "id_orgao",
        as: "licitacoesOrgao"
    })
  };
  return orgao;
};
