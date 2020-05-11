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
  let first_part = "SELECT * FROM ( SELECT *, setweight(to_tsvector(item_contrato.language :: regconfig,item_contrato.ds_1),'A') || setweight(to_tsvector(item_contrato.language :: regconfig,item_contrato.ds_2),'C') || setweight(to_tsvector(item_contrato.language :: regconfig,item_contrato.ds_3),'D') || setweight(to_tsvector(item_contrato.language :: regconfig,item_contrato.ds_item),'D') AS document FROM item_contrato) p_search WHERE   p_search.document @@ to_tsquery('portuguese','";
  let ranking = "') ORDER BY ts_rank(p_search.document, to_tsquery('portuguese','";
  let end = "')) DESC;";
  
  models.sequelize.query(first_part.concat(req.body.termo.join(' | '), ranking, req.body.termo[2], end), {
    model: itensContrato,
    mapToModel: true
  }).then(itensContrato => res.status(SUCCESS).json(itensContrato))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});


module.exports = router;
