const express = require("express");
const Sequelize = require("sequelize");

const router = express.Router();

const models = require("../../models/index");

const Licitacao = models.licitacao;

const BAD_REQUEST = 400;
const SUCCESS = 200;

router.get("/", (req, res) => {

  Licitacao.findAll({
      attributes: [
        'id_licitacao', 'nm_orgao', 'nr_licitacao', 'ano_licitacao',
        'cd_tipo_modalidade', 'tp_licitacao', 'tipo_licitacao'
      ]
  })
  .then(licitacoes => res.status(SUCCESS).json(licitacoes))
  .catch(err => res.status(BAD_REQUEST).json({ err }));
})

router.get("/licitacoes", (req, res) => {

  Licitacao.findAll({
    attributes: [
      'id_licitacao', 'nm_orgao', 'nr_licitacao', 'ano_licitacao',
      'cd_tipo_modalidade', 'tp_licitacao', 'tipo_licitacao'
    ]
  })
  .then(licitacoes => res.status(SUCCESS).json(licitacoes))
  .catch(err => res.status(BAD_REQUEST).json({ err }));
})

module.exports = router;