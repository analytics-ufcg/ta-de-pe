const express = require("express");

const router = express.Router();

const models = require("../../models/index");

const itensLicitacao = models.itensLicitacao;

const BAD_REQUEST = 400;
const SUCCESS = 200;

// Recupera todos os itens da licitação
router.get("/", (req, res) => {
  itensLicitacao.findAll()
    .then(itensLicitacoes => res.status(SUCCESS).json(itensLicitacoes))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

// Recupera itens da licitação a partir do id da licitação
router.get("/licitacao/:id", (req, res) => {
  itensLicitacao.findAll({
    where: {
      id_licitacao: req.params.id
    }
  })
    .then(itensLicitacao => res.status(SUCCESS).json(itensLicitacao))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

module.exports = router;
