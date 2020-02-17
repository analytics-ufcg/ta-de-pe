const express = require("express");

const router = express.Router();

const models = require("../../models/index");

const itensLicitacao = models.itensLicitacao;

const BAD_REQUEST = 400;
const SUCCESS = 200;

router.get("/", (req, res) => {
  itensLicitacao.findAll()
    .then(itensLicitacoes => res.status(SUCCESS).json(itensLicitacoes))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

router.get("/itenslicitacoes", (req, res) => {
  itensLicitacao.findAll()
    .then(itensLicitacoes => res.status(SUCCESS).json(itensLicitacoes))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

module.exports = router;
