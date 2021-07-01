const express = require("express");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const router = express.Router();

const models = require("../../models/index");
const Municipios = models.municipio;

const BAD_REQUEST = 400;
const SUCCESS = 200;

router.get("/", (req, res) => {
  Municipios.findAll()
    .then(municipios => res.status(SUCCESS).json(municipios))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

module.exports = router;
