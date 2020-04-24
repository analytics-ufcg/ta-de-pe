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
        include: [
          {
            model: itensContrato,
            attributes: ["vl_item_contrato"],
            as: "itensLicitacaoContrato"
          }
        ],
        attributes: ["ds_item", "qt_itens_licitacao", "sg_unidade_medida", "vl_unitario_estimado", "vl_total_estimado"],
        as: "itensLicitacao"
      },
      {
        model: novidade,
        as: "licitacaoNovidade",
        include: [
          {
            model: tipoNovidade,
            as: "tipo"
          }
        ]
      },
      {
        model: Contrato,
        attributes: ["vl_contrato"],
        as: "contratosLicitacao"
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
