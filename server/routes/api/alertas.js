const express = require("express");
const Sequelize = require("sequelize");

const router = express.Router();

const models = require("../../models/index");

const Alerta = models.alerta;
const Contrato = models.contrato;
const Fornecedor = models.fornecedor;
const TipoAlerta = models.tipoAlerta;
const Orgao = models.orgao;
const DadosCadastrais = models.dadosCadastrais

const BAD_REQUEST = 400;
const SUCCESS = 200;

// Recupera lista de alertas
router.get("/", (req, res) => {
  Alerta.findAll({
    include: [
      {
        model: Contrato,
        attributes: ["id_contrato", "id_estado", "sigla_estado", "nm_orgao", "nr_contrato", "ano_contrato", "dt_inicio_vigencia", "vl_contrato", "tipo_instrumento_contrato"],
        as: "alertaContrato",
        include: [
          {
            attributes: ["nome_municipio"],
            model: Orgao,
            as: "contratosOrgao"
          }
        ],
      },
      {
        model: DadosCadastrais,
        attributes: ["data_inicio_atividade"],
        as: "alertaDadosFornecedorReceita"
      },
      {
        model: Fornecedor,
        attributes: ["nr_documento", "id_estado", "nm_pessoa", "tp_pessoa", "data_primeiro_contrato"],
        as: "alertaFornecedor",
      },
      {
        model: TipoAlerta,
        attributes: ["titulo"],
        as: "AlertaTipo"
      }
    ]
  })
    .then(alertas => res.status(SUCCESS).json(alertas))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

router.get("/tipos", (req, res) => {
  TipoAlerta.findAll()
    .then(alertas => res.status(SUCCESS).json(alertas))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

router.get("/estados", (req, res) => {
  Contrato.findAll({
    attributes: [
      [Sequelize.fn('DISTINCT', Sequelize.col('id_estado')), 'id_estado'],
      'sigla_estado'
]})
    .then(estados => res.status(SUCCESS).json(estados))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

module.exports = router;
