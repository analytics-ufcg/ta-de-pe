module.exports = (sequelize, type) => {
    socios = sequelize.define(
      "socios",
      {
        id_socio: {
          type: type.STRING,
          primaryKey: true
        },
        tipo_de_registro: type.STRING,
        indicador: type.STRING,
        tipo_atualizacao: type.STRING,
        cnpj: type.STRING,
        identificador_socio: type.STRING,
        nome_socio: type.STRING,
        cnpj_cpf_socio: type.STRING,
        cod_qualificacao_socio: type.STRING,
        percentual_capital_socio: type.STRING,
        data_entrada_sociedade: type.DATE,
        cod_pais: type.STRING,
        nome_pais_socio: type.STRING,
        cpf_representante_legal: type.STRING,
        nome_representante: type.STRING,
        cod_qualificacao_representante_legal: type.STRING,
        fillter: type.STRING,
        fim_registro: type.STRING
      },
      {
        freezeTableName: true,
        timestamps: false
      }
    );
  
    socios.associate = function (models) {
        socios.belongsTo(models.dadosCadastrais, {
            foreignKey: "cnpj",
            sourceKey: "cnpj",
            as: "sociosDadosCadastrais"
          });
    };
    return socios;
  }