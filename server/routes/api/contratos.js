const express = require("express");

const router = express.Router();

const models = require("../../models/index");

const Contrato = models.contrato;

const BAD_REQUEST = 400;
const SUCCESS = 200;

router.get("/", (req, res) => {
  Contrato.findAll()
    .then(contratos => res.status(SUCCESS).json(contratos))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

router.get("/contratos", (req, res) => {
  Contrato.findAll()
    .then(contratos => res.status(SUCCESS).json(contratos))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

module.exports = router;
