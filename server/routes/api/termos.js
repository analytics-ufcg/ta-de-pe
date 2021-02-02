const express = require("express");
const router = express.Router();

const BAD_REQUEST = 400;
const SUCCESS = 200;

router.get("/sugestao", (req, res) => {

    const termo = req.query.termo
  
    let query = `SELECT word FROM unique_lexeme WHERE similarity(word, '${termo}') > 0.3 ORDER BY word <-> '${termo}' LIMIT 1;`

    models.sequelize.query(query).then(termos => res.status(SUCCESS).json(termos[0][0]))
      .catch(err => res.status(BAD_REQUEST).json({ err }));
});
  

module.exports = router;
