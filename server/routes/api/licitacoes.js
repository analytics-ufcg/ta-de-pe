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

router.get("/:id", (req, res) => {
  Licitacao.findOne({
    where: {
      id_licitacao: req.params.id
    }
  })
    .then(licitacoes => res.json(licitacoes))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

module.exports = router;
