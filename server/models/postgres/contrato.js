module.exports = (sequelize, type) => {
    contrato = sequelize.define(
      "contrato",
      {
        id_contrato: {
          type: type.STRING,
          primaryKey: true
        },
        id_licitacao: type.STRING,
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
        tipo_instrumento_contrato: type.STRING,
        language: type.STRING

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
      contrato.belongsTo(models.fornecedor, {
        foreignKey: "nr_documento_contratado",
        sourceKey: "nr_documento",
        as: "contratoFornecedor"
      }); 
      contrato.hasMany(models.itensContrato, {
        foreignKey: "id_contrato",
        sourceKey: "id_contrato",
        as: "itensContrato"
      });
      contrato.hasMany(models.novidade, {
        foreignKey: "id_contrato",
        sourceKey: "id_contrato",
        as: "contratoNovidade"
      });
      contrato.hasOne(models.alerta, {
        foreignKey: "id_contrato",
        sourceKey: "id_contrato",
        as: "contratoAlerta"
      });
    };
    return contrato;
  };
  