const express = require("express");

const router = express.Router();

const models = require("../../models/index");

const Novidades = models.novidade;

const BAD_REQUEST = 400;
const SUCCESS = 200;

router.get("/", (req, res) => {

    Novidades.findAll()
    .then(novidades => res.status(SUCCESS).json(novidades))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
  })
  
  router.get("/novidades", (req, res) => {
  
    Novidades.findAll()
    .then(novidades => res.status(SUCCESS).json(novidades))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
  })
  
  module.exports = router;