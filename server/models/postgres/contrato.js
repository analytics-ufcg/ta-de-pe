module.exports = (sequelize, type) => {
    contrato = sequelize.define(
      "contrato",
      {
        id_contrato: {
          type: type.STRING,
          primaryKey: true
        },
        id_licitacao: type.INTEGER,
        id_orgao: type.INTEGER,
        nr_contrato: type.INTEGER,
        ano_contrato: type.INTEGER,
        nm_orgao: type.STRING,
        nr_licitacao: type.STRING,
        ano_licitacao: type.INTEGER,
        cd_tipo_modalidade: type.STRING,
        tp_instrumento_contrato: type.STRING,
        nr_processo: type.STRING,
        ano_processo: type.INTEGER,
        tp_documento_contratado: type.STRING,
        nr_documento_contratado: type.STRING,
        dt_inicio_vigencia: type.DATE,
        dt_final_vigencia: type.DATE,
        vl_contrato: type.DECIMAL(15, 2),
        contrato_possui_garantia: type.STRING,
        vigencia_original_do_contrato: type.INTEGER,
        descricao_objeto_contrato: type.STRING,
        justificativa_contratacao: type.STRING,
        obs_contrato: type.STRING,
        tipo_instrumento_contrato: type.STRING

      },
      {
        freezeTableName: true,
        timestamps: false
      }
    );
  
    contrato.associate = function(models) {
        contrato.belongsTo(models.orgao, {
        foreignKey: "id_orgao",
        sourceKey: "id_orgao",
        as: "contratosOrgao"
      });
      contrato.belongsTo(models.licitacao, {
        foreignKey: "id_licitacao",
        sourceKey: "id_licitacao",
        as: "contratosLicitacao"
      }); 
    };
    return contrato;
  };
  