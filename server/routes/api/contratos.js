const express = require("express");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const router = express.Router();

const models = require("../../models/index");

const Contrato = models.contrato;
const Fornecedor = models.fornecedor;
const Orgao = models.orgao;

const BAD_REQUEST = 400;
const SUCCESS = 200;

router.get("/", (req, res) => {
  Contrato.findAll()
    .then(contratos => res.status(SUCCESS).json(contratos))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

router.get("/vigentes", (req, res) => {
  const municipio = req.query.nome_municipio;

  Contrato.findAll({
    include: {
      model: Orgao,
      as: "contratosOrgao",
      where: {
        nome_municipio: municipio
      }
    },
    where: {
      dt_inicio_vigencia: {
        [Op.lte]: new Date()
      },
      dt_final_vigencia: {
        [Op.gt]: new Date()
      },
    },
    order: [["dt_inicio_vigencia", "DESC"]]
  })
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
    attributes: ["id_contrato", "nr_contrato", "nr_documento_contratado", "vl_contrato", "dt_inicio_vigencia", "dt_final_vigencia"],
    include: [
      {
        model: Fornecedor,
        attributes: ["nm_pessoa", "tp_pessoa"],
        as: "contratoFornecedor"
      },
      {
        model: itensContrato,
        include: [
          {
            model: itensLicitacao,
            attributes: ["vl_unitario_estimado", "sg_unidade_medida"],
            as: "itensLicitacaoItensContrato"
          },
          {
            model: itensContrato,
            include: [{
              model: Orgao,
              as: "itensContratoOrgao"
            }, {
              model: Contrato,
              as: "itensContratoContrato"
            }],
            as: "itensSemelhantes"
          }
        ],
        attributes: ["qt_itens_contrato", "vl_item_contrato", "vl_total_item_contrato", "ds_item", "categoria", "ano_licitacao", "dt_inicio_vigencia"],
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
        attributes: ["nr_contrato", "ano_contrato", "vl_contrato", "id_contrato"],
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
