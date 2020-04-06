const express = require("express");

const router = express.Router();

const models = require("../../models/index");

const itensContrato = models.itensContrato;

const BAD_REQUEST = 400;
const SUCCESS = 200;

// Recupera todos os itens de contrato
router.get("/", (req, res) => {
  itensContrato.findAll()
    .then(itensContrato => res.status(SUCCESS).json(itensContrato))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

// Recupera itens de contrato a partir do id do contrato
router.get("/contrato/:id", (req, res) => {
  itensContrato.findAll({
    where: {
      id_contrato: req.params.id
    }
  })
    .then(itensContrato => res.status(SUCCESS).json(itensContrato))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});


// Recupera itens de contrato a partir do id da licitação
router.get("/licitacao/:id", (req, res) => {
  itensContrato.findAll({
    where: {
      id_licitacao: req.params.id
    }
  })
    .then(itensContrato => res.status(SUCCESS).json(itensContrato))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});


module.exports = router;
