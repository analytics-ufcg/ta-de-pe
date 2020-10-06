const express = require("express");

const router = express.Router();

const models = require("../../models/index");

const Contrato = models.contrato;
const Fornecedor = models.fornecedor;
const Orgao = models.orgao;
const dadosCadastrais = models.dadosCadastrais;
const socios = models.socios;
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
            model: socios,
            as: "dadosCadastraisSocios",
          }
        ],
        as: "fornecedorDadosCadastrais",
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
