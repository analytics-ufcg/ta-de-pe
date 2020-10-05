module.exports = (sequelize, type) => {
    dadosCadastrais = sequelize.define(
      "dados_cadastrais",
      {
        cnpj: {
          type: type.STRING,
          primaryKey: true
        },
        tipo_de_registro: type.STRING,
        indicador: type.STRING,
        tipo_atualizacao: type.STRING,
        identificador_matriz_filial: type.STRING,
        razao_social: type.STRING,
        nome_fantasia: type.STRING,
        situacao_cadastral: type.STRING,
        data_situacao_cadastral: type.STRING,
        motivo_situacao_cadastral: type.STRING,
        nm_cidade_exterior: type.STRING,
        cod_pais: type.STRING,
        nm_pais: type.STRING,
        codigo_natureza_juridica: type.STRING,
        data_inicio_atividade: type.STRING,
        cnae_fiscal: type.STRING,
        descricao_tipo_logradouro: type.STRING,
        logradouro: type.STRING,
        numero: type.STRING,
        complemento: type.STRING,
        bairro: type.STRING,
        cep: type.STRING,
        uf: type.STRING,
        codigo_municipio: type.STRING,
        municipio: type.STRING,
        ddd_telefone_1: type.STRING,
        ddd_telefone_2: type.STRING,
        ddd_fax: type.STRING,
        correio_eletronico: type.STRING,
        qualificacao_responsavel: type.STRING,
        capital_social_empresa: type.STRING,
        porte_empresa: type.STRING,
        opcao_pelo_simples: type.STRING,
        data_opcao_pelo_simples: type.STRING,
        opcao_pelo_mei: type.STRING,
        situacao_especial: type.STRING,
        data_situacao_especial: type.STRING,
        filler: type.STRING,
        fim_registro: type.STRING
      },
      {
        freezeTableName: true,
        timestamps: false
      }
    );
  
    dadosCadastrais.associate = function (models) {
        dadosCadastrais.belongsTo(models.fornecedor, {
            foreignKey: "cnpj",
            sourceKey: "nr_documento",
            as: "dadosCadastraisFornecedor"
          });

        dadosCadastrais.hasMany(models.socios, {
            foreignKey: "cnpj",
            targetKey: "cnpj",
            as: "dadosCadastraisSocios"
        });
    };
    return dadosCadastrais;
  }


