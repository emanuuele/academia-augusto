require("dotenv").config();
const express = require("express");
const cors = require('cors');
const clientRouter = require("./routes/client.js");
const pagamentosRouter = require("./routes/pagamentos.js");
const veacosRouter = require("./routes/veacos.js");
const bodyParser = require('body-parser')
const server = express();
server.use(bodyParser.json({ limit: 819200 }));
server.use(bodyParser.urlencoded({ extended: true }));

server.use(express.json())

server.use(cors());

// Remova o middleware manual de CORS daqui

server.use(clientRouter);
server.use(pagamentosRouter);
server.use(veacosRouter)

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log("porta executada");
});
