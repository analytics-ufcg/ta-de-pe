const express = require("express");

const router = express.Router();

const models = require("../../models/index");

const itensContrato = models.itensContrato;

const BAD_REQUEST = 400;
const SUCCESS = 200;

// Recupera todos os itens de contrato
router.get("/", (req, res) => {
  itensContrato.findAll()
    .then(itensContrato => res.status(SUCCESS).json(itensContrato))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

// Recupera itens de contrato a partir do id do contrato
router.get("/contrato/:id", (req, res) => {
  itensContrato.findAll({
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
  const termoRanking = req.body.termo[0]

  dataInicial = new Date(dataInicioContrato);
  dataInicial.setMonth(dataInicial.getMonth() - 6);

  dataFinal = new Date(dataInicioContrato);
  dataFinal.setMonth(dataFinal.getMonth() + 6);

  dataInicial = dataInicial.toJSON().slice(0, 10);
  dataFinal = dataFinal.toJSON().slice(0, 10);
    
  let query = `SELECT ano_licitacao, id_item_contrato, id_licitacao, vl_item_contrato, \
                      vl_total_item_contrato, ds_item, dt_inicio_vigencia FROM \
                      item_search WHERE item_search.document @@ to_tsquery('portuguese', '${termo}') AND \
                      dt_inicio_vigencia >= '${dataInicial}' AND dt_inicio_vigencia <= '${dataFinal}'\
                      ORDER BY ts_rank(item_search.document, to_tsquery('portuguese', '${termoRanking}'))\
                      DESC LIMIT 100;`
  
  models.sequelize.query(query, {
    model: itensContrato,
    mapToModel: true
  }).then(itensContrato => res.status(SUCCESS).json(itensContrato))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});


module.exports = router;
