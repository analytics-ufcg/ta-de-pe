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

router.get("/busca", (req, res) => {
  const termo = req.query.termo;

  Municipios.findAll({
    attributes: [
      [
        Sequelize.fn("DISTINCT", Sequelize.col("nome_municipio")),
        "nome_municipio"
      ],
      "slug_municipio",
      "sigla_estado",
    ],
    where: {
      [Op.or]: {
        nome_municipio: {
          [Op.ne]: null,
          [Op.iLike]: '%'.concat(termo).concat('%')
        },
        sigla_estado: {
          [Op.iLike]: '%'.concat(termo).concat('%')
        }
      }
      
    }
  })
    .then(municipios => res.status(SUCCESS).json(municipios))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

module.exports = router;
