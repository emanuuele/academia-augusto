const express = require("express");
const execSQLQuery = require("../dao");

const router = express.Router();

function addDays(date, days) {
  date.setDate(date.getDate() + days);
  return date;
}

router.get("/pagamentos", (req, res) => {
  execSQLQuery(
    `SELECT pagamentos.id, 
            clients.nome, 
            CONCAT('R$ ', REPLACE(REPLACE(REPLACE(FORMAT(pagamentos.valor, 2), '.', '|'), ',', '.'), '|', ',')) AS valor,
            DATE_FORMAT(STR_TO_DATE(pagamentos.ultimoPagamento, '%Y-%m-%d'), '%d/%m/%Y') AS ultimoPagamento,
            DATE_FORMAT(STR_TO_DATE(clients.vencimento, '%Y-%m-%d'), '%d/%m/%Y') AS vencimento 
     FROM pagamentos 
     LEFT JOIN clients ON pagamentos.id_client = clients.id`, 
    res
  );
});

router.post("/pagamentos/", (req, res) => {
  const {
    pagamento: { valor, id_cliente },
  } = req.body;
  console.log('pagamento 1');
  let vencimento;
  let vencimentoString;

  vencimento = addDays(new Date(), valor >= 1000 ? 365 : 30);
  vencimentoString = vencimento.toISOString().slice(0, 10);  

  execSQLQuery(
    `INSERT INTO pagamentos(valor, ultimoPagamento, id_client) VALUES (${valor}, '${new Date().toISOString().slice(0, 10)}', ${id_cliente});` +
      `UPDATE clients SET vencimento = '${vencimentoString}' where id= ${id_cliente};`,
    res
  );
});

module.exports = router;
