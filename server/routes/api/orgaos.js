const express = require("express");
const Sequelize = require("sequelize");

const router = express.Router();

const models = require("../../models/index");
const Orgaos = models.orgao;

const BAD_REQUEST = 400;
const SUCCESS = 200;

router.get("/", (req, res) => {

    Orgaos.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('nm_orgao')), 'nm_orgao']]
    })
    .then(municipios => res.status(SUCCESS).json(municipios))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
})

router.get("/municipios", (req, res) => {

    Orgaos.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('nome_municipio')), 'nome_municipio']]
    })
    .then(municipios => res.status(SUCCESS).json(municipios))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
})

module.exports = router;
