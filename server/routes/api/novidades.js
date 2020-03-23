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
  
  let dataInicial = req.query.data_inicial;

  let dataFinal = req.query.data_final;
  
  if (dataInicial === undefined && dataFinal === undefined) {
    dataFinal = new Date()
    dataInicial = new Date(dataFinal.getTime());
    dataInicial.setFullYear(dataInicial.getFullYear() - 2) // dois anos atrás

    // convertendo para formato do BD
    dataFinal = dataFinal.toJSON().slice(0,10); 
    dataInicial = dataInicial.toJSON().slice(0,10);
  }

  console.log(dataInicial);
  console.log(dataFinal);

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
        [Sequelize.Op.between]: [dataInicial, dataFinal]
      },
      nome_municipio: req.query.nome_municipio.toUpperCase()
    },
    order: [["data", "DESC"]]
  })
    .then(novidades => res.status(SUCCESS).json(novidades))
    .catch(err => res.status(BAD_REQUEST).json({ error: err.message }));
});

module.exports = router;
