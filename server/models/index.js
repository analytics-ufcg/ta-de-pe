const { Sequelize, DataTypes } = require("sequelize");
if (!global.hasOwnProperty("models")) {
  const db = process.env.POSTGRESURI;

  // Connect to Postgres
  const sequelize = new Sequelize(db, {
    host: "localhost",
    dialect: "postgres",
    operatorsAliases: false,
    dialectOptions: {
      ssl: {
        require: process.env.NODE_ENV === 'production',
        rejectUnauthorized: false
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });


  const MunicipioModel = require("./postgres/municipio.js")(sequelize, DataTypes);
  const OrgaoModel = require("./postgres/orgao.js")(sequelize, DataTypes);
  const LicitacaoModel = require("./postgres/licitacao.js")(sequelize, DataTypes);
  const NovidadeModel = require("./postgres/novidade.js")(sequelize, DataTypes);
  const tipoNovidadeModel = require("./postgres/tipoNovidade.js")(sequelize, DataTypes);
  const itensLicitacaoModel = require("./postgres/itensLicitacao.js")(sequelize, DataTypes);
  const contratoModel = require("./postgres/contrato.js")(sequelize, DataTypes);
  const itensContratoModel = require("./postgres/itensContrato.js")(sequelize, DataTypes);
  const fornecedorModel = require("./postgres/fornecedor.js")(sequelize, DataTypes);
  const documentoLicitacaoModel = require("./postgres/documentoLicitacao.js")(sequelize, DataTypes);
  const dadosCadastraisModel = require("./postgres/dadosCadastrais.js")(sequelize, DataTypes);
  const sociosModel = require("./postgres/socios.js")(sequelize, DataTypes);
  const cnaeModel = require("./postgres/cnae.js")(sequelize, DataTypes);
  const cnaeSecundarioModel = require("./postgres/cnaeSecundario.js")(sequelize, DataTypes);
  const naturezaJuridicaModel = require("./postgres/naturezaJuridica.js")(sequelize, DataTypes);
  const tipoAlertaModel = require("./postgres/tipoAlerta.js")(sequelize, DataTypes);
  const alertaModel = require("./postgres/alerta.js")(sequelize, DataTypes);
  const itemAtipicoModel = require("./postgres/item-atipico.js")(sequelize, DataTypes);

  global.models = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    municipio: MunicipioModel,
    orgao: OrgaoModel,
    licitacao: LicitacaoModel,
    novidade: NovidadeModel,
    tipoNovidade: tipoNovidadeModel,
    itensLicitacao: itensLicitacaoModel,
    contrato: contratoModel,
    itensContrato: itensContratoModel,
    fornecedor: fornecedorModel,
    dadosCadastrais: dadosCadastraisModel,
    socios: sociosModel,
    documentoLicitacao: documentoLicitacaoModel,
    cnae: cnaeModel,
    cnaeSecundario: cnaeSecundarioModel,
    naturezaJuridica: naturezaJuridicaModel,
    tipoAlerta: tipoAlertaModel,
    alerta: alertaModel,
    itemAtipico: itemAtipicoModel
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
