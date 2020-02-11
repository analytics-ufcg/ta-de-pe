const express = require("express");

const router = express.Router();

const models = require("../../models/index");

const tipoNovidades = models.tipoNovidade;

const BAD_REQUEST = 400;
const SUCCESS = 200;

router.get("/", (req, res) => {

    Novidades.findAll({
        attributes: ['id_tipo']
    })
    .then(tipoNovidades => res.status(SUCCESS).json(tipoNovidades))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
  })
  
  router.get("/tipoNovidade", (req, res) => {
  
    tipoNovidades.findAll({
      attributes: ['id_tipo']
    })
    .then(tipoNovidades => res.status(SUCCESS).json(tipoNovidades))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
  })
  
  module.exports = router;