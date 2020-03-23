const { check } = require('express-validator');

module.exports = {
  validate: [
      check('data_inicial').custom((data_inicial, { req }) => {
        const dataI = new Date(Date.parse(data_inicial));
        const dataF = new Date(Date.parse(req.query.data_final));

        if (data_inicial === undefined && req.query.data_final == undefined) {
            return true;
        }
        if (data_inicial === undefined && req.query.data_final !== undefined) {
          throw new Error("É preciso definir o parâmetro data_inicial. Formato: YYYY-MM-DD");
        }
        if (!(dataI instanceof Date && !isNaN(dataI))) {
            throw new Error("Data inicial está num formato inválido. Formato correto: YYYY-MM-DD");
        }
        if ((dataI - dataF) > 0) {
            throw new Error("Data inicial não pode ser mais recente que a Data Final.");
        }
        if ((dataI - dataF) > 0) {
            throw new Error("Data inicial não pode ser mais recente que a Data Final.");
        }

        return true;
      }),
      check('data_final').custom((data_final, { req }) => {
        const dataF = new Date(Date.parse(data_final));

        if (data_final === undefined && req.query.data_inicial !== undefined) {
          throw new Error("É preciso definir os parâmetros data_final. Formato: YYYY-MM-DD");
        }
        if (!(dataF instanceof Date && !isNaN(dataF))) {
            throw new Error("Data Final está num formato inválido. Formato correto: YYYY-MM-DD");
        }
        return true;
      }),
      check('nome_municipio').custom((nome_municipio) => {
        if (nome_municipio === undefined || nome_municipio === "") {
          throw new Error("O parâmetro nome_municipio não pode ser vazio.");
        }
        return true;
      })
    ]  
};
