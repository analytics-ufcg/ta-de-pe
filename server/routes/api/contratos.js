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
    attributes: ["nr_contrato", "nr_documento_contratado", "vl_contrato", "dt_inicio_vigencia", "dt_final_vigencia"],
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


router.get("/licitacao/:id/fornecedores", (req, res) => {
  Fornecedor.findAll({
    attributes: ["nr_documento", "nm_pessoa", "tp_pessoa"],
    include: [
      {
        attributes: ["nr_contrato", "ano_contrato", "vl_contrato"],
        model: Contrato,
        as: "fornecedorContratos",
        where: {
          id_licitacao: req.params.id
        }
      }
    ],
  })
    .then(fornecedores => {
      fornecedores = fornecedores.map(f => f.get({ plain: true }));

      fornecedores.forEach((value) => {        
        value.total_contratado = value.fornecedorContratos
          .reduce((a, b) => a + (b["vl_contrato"] || 0), 0);
      });

      res.status(SUCCESS).json(fornecedores)
    })
    .catch(err => res.status(BAD_REQUEST).json({ err: err.message }));
});

module.exports = router;
