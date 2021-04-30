const express = require("express");

const router = express.Router();

const models = require("../../models/index");

const Fornecedor = models.fornecedor;
const dadosCadastrais = models.dadosCadastrais;
const socios = models.socios;
const cnae = models.cnae;
const cnaeSecundario = models.cnaeSecundario;
const naturezaJuridica = models.naturezaJuridica;
const alerta = models.alerta;
const tipoAlerta = models.tipoAlerta;

const BAD_REQUEST = 400;
const SUCCESS = 200;

router.get("/", (req, res) => {
  Fornecedor.findAll()
    .then(fornecedores => res.status(SUCCESS).json(fornecedores))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

router.get("/:id", (req, res) => {
  Fornecedor.findOne({
    include: [
      {
        model: dadosCadastrais,
        include: [
          {
            attributes: ["nome_socio", ["data_entrada_sociedade", "data_entrada"]],
            model: socios,
            as: "dadosCadastraisSocios",
          },
          {
            model: cnae,
            attributes: ["id_cnae", "nm_cnae"],
            as: "dadosCadastraisCnaeFiscal"
          },
          {
            attributes: [["codigo_natureza_juridica", "cod_natureza"], ["nome_subclasse_natureza_juridica", "desc_natureza"]],
            model: naturezaJuridica,
            as: "dadosCadastraisNatureza"
          }
        ],
        as: "fornecedorDadosCadastrais",
      },
      {
        model: cnaeSecundario,
        attributes: ["id_cnae"],
        as: "fornecedorCnaesSecundarios",
        include: [
          {
            model: cnae,
            attributes: ["nm_cnae"],
            as: "cnaeSecundarioCnae"
          }
        ]
      },
      {
        model: alerta,
        attributes: ["id_contrato", "id_tipo", "info"],
        as: "fornecedorAlerta",
        include: [
          {
            model: tipoAlerta,
            attributes: ["titulo"],
            as: "AlertaTipo"
          }
        ]
      }
    ],
    where: {
      nr_documento: req.params.id
    }
  })
    .then(fornecedor => res.status(SUCCESS).json(fornecedor))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

module.exports = router;
