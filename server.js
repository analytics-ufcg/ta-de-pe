const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const compression = require("compression");

/*
 * Configuração do servidor web
 */
const app = express();
app.use(compression());
// Habilita CORS para algumas origens
const corsOptions = {
  origin: ['http://localhost:4200'],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["authorization", ]
};
app.use(cors(corsOptions));
// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Banco de dados
const db = require("./server/models/index");

// Rotas
app.get("/api", (req, res) => {
  res.json({ "status": "OK"});
});

// Define diretório estático (site)
app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// Levanta o servidor
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));