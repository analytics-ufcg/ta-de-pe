const express = require("express");
const Sequelize = require("sequelize");

const router = express.Router();

const models = require("../../models/index");

const Alerta = models.alerta;
const Contrato = models.contrato;
const Fornecedor = models.fornecedor;

const BAD_REQUEST = 400;
const SUCCESS = 200;

// Recupera lista de alertas
router.get("/", (req, res) => {
  Alerta.findAll({
    include: [
      {
        model: Contrato,
        attributes: ["id_contrato", "nm_orgao", "nr_contrato", "ano_contrato", "vl_contrato"],
        as: "alertaContrato"
      },
      {
        model: Fornecedor,
        attributes: ["nr_documento", "nm_pessoa", "tp_pessoa"],
        as: "alertaFornecedor"
      }
    ]
  })
    .then(alertas => res.json(alertas))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

module.exports = router;
