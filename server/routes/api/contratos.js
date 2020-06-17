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
    attributes: ["id_contrato", "id_licitacao", "nr_contrato", "nr_documento_contratado", "vl_contrato", "dt_inicio_vigencia", "dt_final_vigencia"],
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
        attributes: ["nm_pessoa", "tp_pessoa"],
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

router.get("/:id", (req, res) => {
  Contrato.findOne({
    attributes: ["id_contrato", "nr_contrato", "nr_documento_contratado", "vl_contrato", "dt_inicio_vigencia", "dt_final_vigencia", "ano_contrato"],
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

router.get("/licitacao/:id", (req, res) => {
  Contrato.findAll({
    attributes: ["id_contrato", "nr_contrato", "nr_documento_contratado", "vl_contrato", "dt_inicio_vigencia", "dt_final_vigencia", "ano_contrato"],
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
          }
        ],
        attributes: ["qt_itens_contrato", "vl_item_contrato", "vl_total_item_contrato", "ds_item", "categoria", "ano_licitacao", "dt_inicio_vigencia"],
        as: "itensContrato"
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
      id_licitacao: req.params.id
    }
  })
    .then(contratos => {

      contratos = contratos.map(contrato => {
        let data = contrato.toJSON();

        if (data.contratoNovidade && data.contratoNovidade.length > 0) {
          data.total_pago = data.contratoNovidade
            .map(item => item.valor)
            .reduce((prev, next) => prev + next);
        } else {
          data.total_pago = 0;
        }

        return data;
      })

      res.json(contratos)
    })
    .catch(err => {
      console.log(err)
      res.status(BAD_REQUEST).json({ err })
    });
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
