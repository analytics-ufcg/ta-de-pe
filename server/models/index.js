const Sequelize = require("sequelize");

const OrgaoModel = "./postgres/orgao.js";
const LicitacaoModel = "./postgres/licitacao.js";
const NovidadeModel = "./postgres/novidade.js";
const tipoNovidadeModel = "./postgres/tipoNovidade.js";
const itensLicitacaoModel = "./postgres/itensLicitacao.js";
const contratoModel = "./postgres/contratos.js";

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
    contrato: sequelize.import(contratoModel)
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
