const express = require("express");
const router = express.Router();

const models = require("../../models/index");

const Licitacao = models.licitacao;

const BAD_REQUEST = 400;

/**
 * Testa a rota de licitacoes.
 * @name get/api/licitacoes/test
 * @function
 * @memberof module:routes/licitacoes
 */
router.get("/test", (req, res) =>
  res.json({ msg: "Testando a rota de licitacoes." })
);

/**
 * Recupera informações de licitacaoes de acordo com o id (no Ta na mesa).
 * @name get/api/licitacaoes/:id
 * @function
 * @memberof module:routes/licitacaoes
 * @param {string} id - id da licitacao na plataforma Ta na mesa
 */
router.get("/:id", (req, res) => {
    Licitacao.findAll({
      where: {
        id_licitacao: req.params.id
      }
    })
      .then(licitacao => res.json(licitacao))
      .catch(err => res.status(BAD_REQUEST).json({ err }));
  });