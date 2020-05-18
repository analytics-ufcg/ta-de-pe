const express = require("express");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const router = express.Router();

const models = require("../../models/index");

const Licitacao = models.licitacao;
const Contrato = models.contrato;
const Orgao = models.orgao;

const BAD_REQUEST = 400;
const SUCCESS = 200;

router.get("/", (req, res) => {
  Licitacao.findAll()
    .then(licitacoes => res.status(SUCCESS).json(licitacoes))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

router.get("/abertas", (req, res) => {
  const municipio = req.query.nome_municipio;

  Licitacao.findAll({
    include: {
      model: Orgao,
      as: "licitacoesOrgao",
      where: {
        nome_municipio: municipio
      }
    },
    where: {
      data_homologacao: {
        [Op.eq]: null
      }
    },
    order: [["data_abertura", "DESC"], ["id_licitacao", "DESC"]]
  })
    .then(licitacoes => res.status(SUCCESS).json(licitacoes))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

router.get("/:id", (req, res) => {
  Licitacao.findOne({
    include: [
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
