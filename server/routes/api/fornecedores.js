const express = require("express");

const router = express.Router();

const models = require("../../models/index");

const Contrato = models.contrato;
const Fornecedor = models.fornecedor;
const Orgao = models.orgao;
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
        model: Contrato,
        attributes: ["id_contrato", "id_licitacao", "id_orgao", "nr_contrato", "ano_contrato", "nr_licitacao", "ano_licitacao", "cd_tipo_modalidade",
          "tp_instrumento_contrato", "dt_inicio_vigencia", "dt_final_vigencia", "vl_contrato", "descricao_objeto_contrato"],
        as: "fornecedorContratos",
        include: [
          {
            attributes: ["nome_municipio"],
            model: Orgao,
            as: "contratosOrgao"
          }
        ]
      },
    ],
    where: {
      nr_documento: req.params.id
    }
  })
    .then(fornecedor => res.status(SUCCESS).json(fornecedor))
    .catch(err => res.status(BAD_REQUEST).json({ err }));
});

module.exports = router;
