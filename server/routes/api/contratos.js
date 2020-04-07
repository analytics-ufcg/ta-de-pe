const express = require("express");

const router = express.Router();

const models = require("../../models/index");

const Contrato = models.contrato;
const Fornecedor = models.fornecedor;

const BAD_REQUEST = 400;
const SUCCESS = 200;

router.get("/", (req, res) => {
  Contrato.findAll()
    .then(contratos => res.status(SUCCESS).json(contratos))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

router.get("/:id", (req, res) => {
  Contrato.findOne({
    where: {
      id_contrato: req.params.id
    }
  })
    .then(contratos => res.json(contratos))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

router.get("/licitacao/:id", (req, res) => {
  Contrato.findAll({
    attributes: ["nr_contrato", "nr_documento_contratado", "vl_contrato"],
    include: [
      {
        model: Fornecedor,
        attributes: ["nm_pessoa", "tp_pessoa"],
        as: "contratoFornecedor"
      },
      {
        model: itensContrato,
        attributes: ["qt_itens_contrato", "vl_item_contrato", "vl_total_item_contrato", "ds_item"],
        as: "itensContrato"
      }
    ],
    where: {
      id_licitacao: req.params.id
    }
  })
    .then(contratos => res.json(contratos))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});


module.exports = router;
