const express = require("express");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const router = express.Router();

const models = require("../../models/index");

const Licitacao = models.licitacao;
const Contrato = models.contrato;
const Orgao = models.orgao;
const DocumentoLicitacao = models.documentoLicitacao;

const BAD_REQUEST = 400;
const SUCCESS = 200;

router.get("/", (req, res) => {
  Licitacao.findAll()
    .then(licitacoes => res.status(SUCCESS).json(licitacoes))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

router.get("/municipio/:nome_municipio", (req, res) => {
  const municipio = req.params.nome_municipio;

  Licitacao.findAll({
    include: [
      {
        model: Contrato,
        attributes: ["vl_contrato"],
        as: "contratosLicitacao"
      },
      {
        attributes: ["nome_municipio"],
        model: Orgao,
        as: "licitacoesOrgao",
        where: {
          nome_municipio: municipio
        },
        required: true
      }
    ],
    order: [["data_abertura", "DESC"]]
  })
    .then(licitacoes => res.status(SUCCESS).json(licitacoes))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

router.get("/abertas", (req, res) => {
  const municipio = req.query.nome_municipio;

  Licitacao.findAll({
    include: [
      {
        attributes: ["nome_municipio"],
        model: Orgao,
        as: "licitacoesOrgao",
        where: {
          nome_municipio: municipio
        },
        required: true
      }
    ],
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
        attributes: ["vl_contrato", "tipo_instrumento_contrato"],
        as: "contratosLicitacao"
      },
      {
        model: DocumentoLicitacao,
        attributes: ["id_documento_licitacao", "descricao_tipo_documento", "cd_tipo_documento", "nome_arquivo_documento", "arquivo_url_download"],
        as: "docsLicitacao",
        where: {
          cd_tipo_documento: "EDI"
        },
        required: false
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
