module.exports = (sequelize, type) => {
    licitacao = sequelize.define(
      "licitacao",
      {
        id_licitacao: {
            type: type.INTEGER,
            primaryKey: true
        },
        id_estado: type.STRING,
        nm_orgao: type.STRING,
        nr_licitacao: type.INTEGER,
        ano_licitacao: type.INTEGER,
        cd_tipo_modalidade: type.STRING,
        permite_subcontratacao: type.STRING,
        tp_fornecimento: type.STRING,
        descricao_objeto: type.STRING,
        vl_estimado_licitacao: type.DECIMAL(15, 2),
        data_abertura: type.DATE,
        dt_homologacao: type.DATE,
        vl_homologado: type.DECIMAL(15, 2),
        tp_licitacao: type.STRING,
        tipo_licitacao: type.STRING
      },
      {
        freezeTableName: true
      }
    );
    
    licitacao.associate = function(models) {
        licitacao.belongsTo(models.orgao, {
            foreignKey: "id_orgao",
            sourceKey: "id_orgao",
            as: "licitacoesOrgao"
        })
    };
    return licitacao;
}