const express = require("express");

const router = express.Router();

const models = require("../../models/index");

const Licitacao = models.licitacao;
const itensLicitacao = models.itensLicitacao;
const itensContrato = models.itensContrato;

const Contrato = models.contrato;

const BAD_REQUEST = 400;
const SUCCESS = 200;

router.get("/", (req, res) => {
  Licitacao.findAll()
    .then(licitacoes => res.status(SUCCESS).json(licitacoes))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

router.get("/:id", (req, res) => {
  Licitacao.findOne({
    include: [
      {
        model: itensLicitacao,
        attributes: ["ds_item", "qt_itens_licitacao", "sg_unidade_medida", "vl_unitario_estimado", "vl_total_estimado"],
        as: "itensLicitacao"
      },
      {
        model: Contrato,
        include: [
          {
            model: itensContrato,
            attributes: ["qt_itens_contrato", "vl_item_contrato", "vl_total_item_contrato", "ds_item"],
            as: "itensContrato"
          }
        ],
        attributes: ["nr_contrato", "nr_documento_contratado", "vl_contrato"],
        as: "constratosLicitacao"
      }
    ],
    where: {
      id_licitacao: req.params.id
    }
  })
    .then(licitacoes => res.json(licitacoes))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

module.exports = router;
