const Sequelize = require("sequelize");

const OrgaoModel = "./postgres/orgao.js";
const LicitacaoModel = "./postgres/licitacao.js";
const NovidadeModel = "./postgres/novidade.js";
const tipoNovidadeModel = "./postgres/tipoNovidade.js";
const itensLicitacaoModel = "./postgres/itensLicitacao.js";
const contratoModel = "./postgres/contrato.js";
const itensContratoModel = "./postgres/itensContrato.js"
const fornecedorModel = "./postgres/fornecedor.js"
const documentoLicitacaoModel = "./postgres/documentoLicitacao.js"
const dadosCadastraisModel = "./postgres/dadosCadastrais.js"
const sociosModel = "./postgres/socios.js"
const cnaeModel = "./postgres/cnae.js"
const cnaeSecundarioModel = "./postgres/cnaeSecundario.js"
const naturezaJuridicaModel = "./postgres/naturezaJuridica.js"
const tipoAlertaModel = "./postgres/tipoAlerta.js"
const alertaModel = "./postgres/alerta.js"


if (!global.hasOwnProperty("models")) {
  const db = process.env.POSTGRESURI;

  // Connect to Postgres
  const sequelize = new Sequelize(db, {
    host: "localhost",
    dialect: "postgres",
    operatorsAliases: false,
    dialectOptions: {
      ssl: process.env.NODE_ENV === 'production'
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

  global.models = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    orgao: sequelize.import(OrgaoModel),
    licitacao: sequelize.import(LicitacaoModel),
    novidade: sequelize.import(NovidadeModel),
    tipoNovidade: sequelize.import(tipoNovidadeModel),
    itensLicitacao: sequelize.import(itensLicitacaoModel),
    contrato: sequelize.import(contratoModel),
    itensContrato: sequelize.import(itensContratoModel),
    fornecedor: sequelize.import(fornecedorModel),
    dadosCadastrais: sequelize.import(dadosCadastraisModel),
    socios: sequelize.import(sociosModel),
    documentoLicitacao: sequelize.import(documentoLicitacaoModel),
    cnae: sequelize.import(cnaeModel),
    cnaeSecundario: sequelize.import(cnaeSecundarioModel),
    naturezaJuridica: sequelize.import(naturezaJuridicaModel),
    tipoAlerta: sequelize.import(tipoAlertaModel),
    alerta: sequelize.import(alertaModel)
    //add your others models here
  };

  Object.keys(global.models).forEach(modelName => {
    console.log(global.models[modelName].associate);
    if (global.models[modelName].associate !== undefined) {
      global.models[modelName].associate(global.models);
    }
  });
  
  sequelize.sync({ force: false }).then(() => {
    console.log("Conectado com o banco de dados");
  });
  // Retorna campos do tipo decimal como float e não como string
  Sequelize.postgres.DECIMAL.parse = function (value) { return parseFloat(value); };
}
module.exports = global.models;
