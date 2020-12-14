const express = require("express");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const router = express.Router();

const models = require("../../models/index");

const Contrato = models.contrato;
const Fornecedor = models.fornecedor;
const Orgao = models.orgao;
const Alerta = models.alerta;
const TipoAlerta = models.tipoAlerta;
const ItensAtipicos = models.itemAtipico;
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
        [Op.or]: {
          [Op.gte]: new Date(),
          [Op.eq]: null
        }
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

router.get("/search", (req, res) => {
  const termos = req.query.termo.replace(/[&|!<()\\:',]/gi, '').replace( /\s+/g, ' ').trim().split(' ').join(' & ');
  
  let query = `SELECT \
            id_contrato, \
            nr_contrato, \
            descricao_objeto_contrato, \
            tipo_instrumento_contrato, \
            nr_documento_contratado, \
            vl_contrato, \
            dt_inicio_vigencia, \
            dt_final_vigencia, \
            tipo_instrumento_contrato, \
            id_orgao, \
            (\
              SELECT \
              nome_municipio \
              FROM \
              orgao \
              WHERE \
              orgao.id_orgao = p_search.id_orgao
            ),
            (\
              SELECT \
              nm_pessoa as nm_fornecedor \
              FROM \
              fornecedor \
              WHERE \
              fornecedor.nr_documento = p_search.nr_documento_contratado
            ) \
        FROM \
            ( \
                SELECT \
                *, \
                to_tsvector( \
                    contrato.language::regconfig, \
                    contrato.descricao_objeto_contrato \
                ) AS document \
            FROM \
                contrato \
            ) p_search \
        WHERE \
        p_search.document @@to_tsquery('portuguese', '${termos}') \
        ORDER BY \
        ts_rank( \
            p_search.document, \
            to_tsquery('portuguese', '${termos}') \
        ) DESC; `
        
  models.sequelize.query(query, {
      model: Contrato,
      mapToModel: true
  }).then(contratos => res.status(SUCCESS).json(contratos))
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
      },
      {
        model: Alerta,
        attributes: ["id_contrato", "id_tipo", "info"],
        as: "contratoAlerta",
        include: [
          {
            model: TipoAlerta,
            attributes: ["titulo"],
            as: "AlertaTipo"
          },
          {
            model: ItensAtipicos,
            attributes: ["id_item_contrato"],
            as: "alertaItens"
          }
        ]
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
