const express = require("express");
const Sequelize = require("sequelize");

const router = express.Router();

const models = require("../../models/index");

const Novidades = models.novidade;
const TipoNovidade = models.tipoNovidade;
const Licitacao = models.licitacao;

const BAD_REQUEST = 400;
const SUCCESS = 200;

router.get("/", (req, res) => {
  
  Novidades.findAll({
    include: [
      {
        model: TipoNovidade,
        as: "tipo"
      },
      {
        model: Licitacao,
        attributes: ["id_licitacao", "nr_licitacao", "ano_licitacao", "vl_estimado_licitacao"],
        as: "licitacaoNovidade"
      }
    ],
    where: {
      data: {
        [Sequelize.Op.ne]: null
      },
      nome_municipio: req.param('nome_municipio').toUpperCase()
    },
    limit: 50,
    order: [["data", "DESC"]]
  })
    .then(novidades => res.status(SUCCESS).json(novidades))
    .catch(err => res.status(BAD_REQUEST).json({ error: err.message }));
});

module.exports = router;
