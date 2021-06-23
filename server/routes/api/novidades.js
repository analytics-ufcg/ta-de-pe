const express = require("express");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { validationResult } = require('express-validator');

const router = express.Router();

const models = require("../../models/index");

const novidadesValidator = require("../../middlewares/novidades.validator.js");

const Novidades = models.novidade;
const TipoNovidade = models.tipoNovidade;
const Licitacao = models.licitacao;

const BAD_REQUEST = 400;
const SUCCESS = 200;

router.get("/", novidadesValidator.validate, (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let dataInicial = req.query.data_inicial;

  let dataFinal = req.query.data_final;

  if (dataInicial === undefined && dataFinal === undefined) {
    dataFinal = new Date()
    dataInicial = new Date(dataFinal.getTime());
    dataInicial.setFullYear(dataInicial.getFullYear() - 2) // dois anos atrás

    // convertendo para formato do BD
    dataFinal = dataFinal.toJSON().slice(0, 10);
    dataInicial = dataInicial.toJSON().slice(0, 10);
  }

  let whereClause = {
    data: {
      [Sequelize.Op.between]: [dataInicial, dataFinal]
    }
  }

  // Limite de novidades para quando não há município selecionado
  let limitClause = 1000

  const municipio = req.query.nome_municipio

  if (municipio !== undefined && municipio !== "") {
    whereClause.nome_municipio = {
      [Op.iLike]: municipio.toUpperCase()
    }
    limitClause = null
  }

  Novidades.findAll({
    include: [
      {
        model: TipoNovidade,
        as: "tipo"
      },
      {
        model: Licitacao,
        attributes: ["id_licitacao", "nr_licitacao", "ano_licitacao", "vl_estimado_licitacao"],
        as: "licitacaoNovidade"
      }
    ],
    where: whereClause,
    limit: limitClause,
    order: [["data", "DESC"], ["id_licitacao", "DESC"]]
  })
    .then(novidades => res.status(SUCCESS).json(novidades))
    .catch(err => res.status(BAD_REQUEST).json({ error: err.message }));
});

// Recupera novidades a partir do id da licitação
router.get("/licitacao/:id", (req, res) => {
  novidade.findAll({
    include: [
      {
        model: tipoNovidade,
        as: "tipo"
      }
    ],
    where: {
      id_licitacao: req.params.id,
      data: {
        [Op.ne]: null
      }
    }
  })
    .then(novidades => res.json(novidades))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

module.exports = router;
