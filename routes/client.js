const execSQLQuery = require("../dao");

const express = require("express");

const router = express.Router();

router.get("/clients", (req, res) => {
  execSQLQuery(
    `SELECT id, nome, altura, peso, idade, 
      TO_CHAR(TO_DATE(nascimento, 'DD/MM/YYYY'), 'DD-MM-YYYY') as nascimento
     FROM clients 
     WHERE ativo is null or ativo = 'S'`,
    res
  );
});

router.post("/clients", (req, res) => {
  const {
    clientData: { nome, idade, peso, altura, nascimento, ultimoPagamento },
  } = req.body;
  execSQLQuery(
    `INSERT INTO clients(nome, idade, altura, peso, nascimento, ultimoPagamento, ativo) VALUES ('${nome}', ${idade}, ${altura}, ${peso}, '${nascimento}', '${ultimoPagamento}', 'S');`,
    res
  );
});
router.get('/clients/:param?', (req,res)=>{
  let param = req.params.param
  execSQLQuery(`SELECT * FROM clients where nome like '%${param}%' and ativo = 'S' or id like '%${param}%' and ativo = 'S'`, res)
})

router.put("/clients/:id?", (req, res) => {
  const id = parseInt(req.params.id);
  const {
    clientData: { nome, idade, peso, altura, nascimento },
  } = req.body;

  execSQLQuery(
    `UPDATE clients SET nome ='${nome}', idade=${idade}, altura=${altura}, peso=${peso}, nascimento='${nascimento}' WHERE id = ${id}`,
    res
  );
});

router.delete("/clients/:id?", (req, res) => {
  const id = parseInt(req.params.id);
  const flag = "N";
  execSQLQuery(`UPDATE clients SET ativo="${flag}" WHERE ID = ${id}`, res);
});

router.put("/clients/:id?", (req, res) => {
  const id = parseInt(req.params.id);
  const {
    clientData: { nome, idade, peso, altura, nascimento },
  } = req.body;

  execSQLQuery(
    `UPDATE clients SET nome = '${nome}', idade = ${idade}, altura = ${altura}, peso = ${peso}, nascimento = '${nascimento}' WHERE id = ${id}`,
    res
  );
});

module.exports = router;
