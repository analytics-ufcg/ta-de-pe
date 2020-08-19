const express = require("express");

const router = express.Router();

const models = require("../../models/index");
const { Sequelize } = require("sequelize");

const itensContrato = models.itensContrato;
const Orgao = models.orgao;

const BAD_REQUEST = 400;
const SUCCESS = 200;

// Recupera todos os itens de contrato
router.get("/", (req, res) => {
  itensContrato.findAll()
    .then(itensContrato => res.status(SUCCESS).json(itensContrato))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

// Recupera item de contrato a partir do id do item
router.get("/item/:id", (req, res) => {
  itensContrato.findOne({
    include: [{
    model: Orgao,
    as: "itensContratoOrgao"
  }],
    where: {
      id_item_contrato: req.params.id
    }
  })
    .then(itensContrato => res.status(SUCCESS).json(itensContrato))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

// Recupera itens de contrato a partir do id do contrato
router.get("/contrato/:id", (req, res) => {
  itensContrato.findAll({
    raw: true,
    attributes: {
      include: [
        [Sequelize.col('itensLicitacaoItensContrato.vl_unitario_estimado'), 'vl_unitario_estimado'],
        [Sequelize.col('itensLicitacaoItensContrato.sg_unidade_medida'), 'sg_unidade_medida']
      ]
    },
    include: [
      {
        model: itensLicitacao,
        attributes: [],
        as: "itensLicitacaoItensContrato"
      }
    ],
    where: {
      id_contrato: req.params.id
    }
  })
    .then(itensContrato => res.status(SUCCESS).json(itensContrato))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});


// Recupera itens de contrato a partir do id da licitação
router.get("/licitacao/:id", (req, res) => {
  itensContrato.findAll({
    where: {
      id_licitacao: req.params.id
    }
  })
    .then(itensContrato => res.status(SUCCESS).json(itensContrato))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

router.post("/similares", (req, res) => {

  const dataInicioContrato = req.body.data;
  const termo = req.body.termo.join(' | ')
  const termoRanking = req.body.termo[2]
  const unidade = req.body.unidade

  dataInicial = new Date(dataInicioContrato);
  dataInicial.setMonth(dataInicial.getMonth() - 6);

  dataFinal = new Date(dataInicioContrato);
  dataFinal.setMonth(dataFinal.getMonth() + 6);

  dataInicial = dataInicial.toJSON().slice(0, 10);
  dataFinal = dataFinal.toJSON().slice(0, 10);
    
  let query = `SELECT ano_licitacao, id_item_contrato, id_contrato, nr_contrato, id_licitacao, vl_item_contrato, \
                      vl_total_item_contrato, ds_item, dt_inicio_vigencia, qt_itens_contrato, nome_municipio, \
                      ts_rank(item_search.document, to_tsquery('portuguese', '${termoRanking}')) as rel, \ 
                      sg_unidade_medida \
                      FROM item_search WHERE item_search.document @@ to_tsquery('portuguese', '${termo}') AND \
                      dt_inicio_vigencia >= '${dataInicial}' AND dt_inicio_vigencia <= '${dataFinal}'\
                      AND sg_unidade_medida = '${unidade}'\
                      AND vl_item_contrato > 0 \
                      AND ts_rank(item_search.document, to_tsquery('portuguese', '${termoRanking}')) >= 0.65\
                      ORDER BY ts_rank(item_search.document, to_tsquery('portuguese', '${termoRanking}')) DESC, id_item_contrato ASC \
                      LIMIT 21;`
  models.sequelize.query(query, {
    model: itensContrato,
    mapToModel: true
  }).then(itensContrato => res.status(SUCCESS).json(itensContrato))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});


module.exports = router;
