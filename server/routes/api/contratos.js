const express = require("express");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const router = express.Router();

const models = require("../../models/index");

const Contrato = models.contrato;
const Fornecedor = models.fornecedor;
const Orgao = models.orgao;
const Licitacao = models.licitacao;
const Novidade = models.novidade;
const sequelize = models.sequelize;

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
    raw: true,
    attributes: {
      include: [[Sequelize.col('contratoFornecedor.nm_pessoa'), 'nm_fornecedor'],
                [Sequelize.col('contratoFornecedor.tp_pessoa'), 'tp_fornecedor'],
                "id_contrato", "id_licitacao", "nr_contrato", "nr_documento_contratado", "vl_contrato", "dt_inicio_vigencia", "dt_final_vigencia"]
    },
    include: [
      {
        attributes: ["nome_municipio"],
        model: Orgao,
        as: "contratosOrgao",
        where: {
          nome_municipio: municipio
        },
        required: true
      },
      {
        model: Fornecedor,
        attributes: [],
        as: "contratoFornecedor"
      }
    ],
    where: {
      dt_inicio_vigencia: {
        [Op.lte]: new Date()
      },
      dt_final_vigencia: {
        [Op.gt]: new Date()
      },
    },
    order: [["dt_inicio_vigencia", "DESC"]],
    limit: 50
  })
    .then(contratos => res.status(SUCCESS).json(contratos))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

router.get("/licitacao/:id", (req, res) => {
  Contrato.findAll({
    raw: true,
    attributes: {
      include: [[Sequelize.col('contratoFornecedor.nm_pessoa'), 'nm_fornecedor'],
                [Sequelize.col('contratoFornecedor.tp_pessoa'), 'tp_fornecedor'],
                "id_contrato", "id_licitacao", "nr_contrato", "nr_documento_contratado", "vl_contrato", "dt_inicio_vigencia", "dt_final_vigencia"]
    },
    include: [
      {
        model: Fornecedor,
        attributes: [],
        as: "contratoFornecedor"
      }
    ],
    where: {
      id_licitacao: req.params.id
    }
  })
  .then(contratos => res.status(SUCCESS).json(contratos))
  .catch(err => res.status(BAD_REQUEST).json({ err }));
});


router.get("/fornecedor/:id", (req, res) => {
  Contrato.findAll({
    raw: true,
    attributes:["id_contrato", "id_licitacao", 
                "id_orgao", "nr_contrato", "ano_contrato", 
                "nr_licitacao", "ano_licitacao", "cd_tipo_modalidade", 
                "tp_instrumento_contrato", "dt_inicio_vigencia", 
                "dt_final_vigencia", "vl_contrato", "descricao_objeto_contrato", 
                [Sequelize.col('contratosOrgao.nome_municipio'), 'nome_municipio']
               ]
    ,
    include: [
      {
        model: Orgao,
        attributes: ["nome_municipio"],
        as: "contratosOrgao"
      }
    ],
    where: {
      nr_documento_contratado: req.params.id
    }
  })
  .then(contratos => res.status(SUCCESS).json(contratos))
  .catch(err => res.status(BAD_REQUEST).json({ err }));
});


router.get("/:id", (req, res) => {
  Contrato.findOne({
    include: [
      {
        model: Fornecedor,
        attributes: ["nm_pessoa", "tp_pessoa"],
        as: "contratoFornecedor"
      },
      {
        model: Novidade,
        attributes: ["id_tipo", [sequelize.literal('CAST(texto_novidade as REAL)'), 'valor']],
        required: false,
        as: "contratoNovidade",
        where: {
          id_tipo: {
            [Op.or]: [6, 9] // 6 (novidade de pagamento) e 9 (novidade de empenho)
          }
        }
      }
    ],
    where: {
      id_contrato: req.params.id
    }
  })
    .then(contrato => {
      contrato = contrato.get({ plain: true });

      if (contrato.contratoNovidade && contrato.contratoNovidade.length > 0) {
        contrato.total_pago = contrato.contratoNovidade
          .map(item => item.valor)
          .reduce((prev, next) => prev + next);
      } else {
        contrato.total_pago = 0;
      }

      res.json(contrato)
    })
    .catch(err => {
      console.log(err)
      res.status(BAD_REQUEST).json({ err })
    });
});

module.exports = router;
