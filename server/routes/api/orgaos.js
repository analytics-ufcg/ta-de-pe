const express = require("express");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const router = express.Router();

const models = require("../../models/index");
const Orgaos = models.orgao;

const BAD_REQUEST = 400;
const SUCCESS = 200;

router.get("/", (req, res) => {
  Orgaos.findAll()
    .then(municipios => res.status(SUCCESS).json(municipios))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

router.get("/municipios", (req, res) => {
  Orgaos.findAll({
    attributes: [
      [
        Sequelize.fn("DISTINCT", Sequelize.col("nome_municipio")),
        "nome_municipio"
      ],
      "sigla_estado"
    ],
    where: {
      nome_municipio: {
        [Op.ne]: null
      }
    }
  })
    .then(municipios => res.status(SUCCESS).json(municipios))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

module.exports = router;
