const express = require("express");

const router = express.Router();

const models = require("../../models/index");

const Novidades = models.novidade;

const BAD_REQUEST = 400;
const SUCCESS = 200;

attNovidade = ['id_novidade', 'id_tipo', 'id_licitacao', 'data', 'id_original', 'nm_municipio'];

router.get("/", (req, res) => {

    Novidades.findAll({
        attributes: attNovidade
    })
    .then(novidades => res.status(SUCCESS).json(novidades))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
  })
  
  router.get("/novidades", (req, res) => {
  
    Novidades.findAll({
      attributes: attNovidade
    })
    .then(novidades => res.status(SUCCESS).json(novidades))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
  })
  
  module.exports = router;