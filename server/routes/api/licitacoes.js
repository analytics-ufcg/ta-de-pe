const express = require("express");

const router = express.Router();

const models = require("../../models/index");

const Licitacao = models.licitacao;

const BAD_REQUEST = 400;
const SUCCESS = 200;

router.get("/", (req, res) => {
  Licitacao.findAll()
    .then(licitacoes => res.status(SUCCESS).json(licitacoes))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

router.get("/licitacoes", (req, res) => {
  Licitacao.findAll()
    .then(licitacoes => res.status(SUCCESS).json(licitacoes))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

router.get("/:id", (req, res) => {
  Licitacao.findAll({
    where: {
      id_licitacao: req.params.id
    }
  })
    .then(licitacoes => res.json(licitacoes))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

router.get("/:id", (req, res) => {
  Licitacao.findOne({
    attributes: [
      "id_licitacao",
      "nm_orgao",
      "nr_licitacao",
      "ano_licitacao",
      "cd_tipo_modalidade",
      "tp_licitacao",
      "tipo_licitacao",
      "data_abertura",
      "vl_homologado"
    ],
    where: {
      id_licitacao: req.params.id
    }
  })
    .then(licitacao => res.status(SUCCESS).json(licitacao))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

module.exports = router;
